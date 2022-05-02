<template>
  <div>
    <div class="flex justify-between">
      <div>Mis proyectos</div>
      <ButtonComponent
        :to="{ name: 'dashboard-projects-create' }"
        text="Añadir"
      />
    </div>
    <draggable
      v-if="elementsToOrder"
      v-model="elementsToOrder"
      @start="drag = true"
      @end="drag = false"
      item-key="id"
      :sort="sort"
      @change="updateOrder"
    >
      <template #item="{ element }">
        <ListItem>
          <template #image>
            <img
              v-if="element.logo"
              class="h-8 w-8"
              :src="element.logo"
              alt=""
            />
            <template v-else>{{ element.name[0] }}</template>
          </template>
          <template #title>
            {{ element.name }}
          </template>
          <template #subtitle>
            {{ element.description }}
          </template>
          <template #button>
            <Dropdown>
              <template #activator>
                <IconComponent
                  name="DotsVerticalIcon"
                  class="text-red bg-red w-5"
                />
              </template>
              <template #content>
                <DropdownMenuItem
                  is="router-link"
                  :to="{
                    name: 'dashboard-projects-edit',
                    params: { id: element.id },
                  }"
                >
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  @click="
                    id = element.id;
                    isOpen = true;
                  "
                >
                  Eliminar
                </DropdownMenuItem>
              </template>
            </Dropdown>
          </template>
        </ListItem>
      </template>
    </draggable>
    <ProjectsModalDelete
      :isOpen="isOpen"
      @close="
        isOpen = false;
        id = '';
      "
      @confirm="submit"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";

import useProjects from "@/composables/useProjects";
import ListItem from "@/components/common/list/ListItem.vue";
import Dropdown from "@/components/common/dropdown/Dropdown.vue";
import DropdownMenuItem from "@/components/common/dropdown/DropdownMenuItem.vue";
import useNotifications from "@/composables/useNotifications";
import ProjectsModalDelete from "./ProjectsModalDelete.vue";
import draggable from "vuedraggable";
import ProjectInterface from "@/definitions/entities/ProjectInterface";

export default defineComponent({
  components: {
    ListItem,
    Dropdown,
    DropdownMenuItem,
    ProjectsModalDelete,
    draggable,
  },
  setup() {
    const { projects, deleteProject, isFinished, updateOrderProjects } =
      useProjects();
    const isOpen = ref(false);
    const id = ref("");
    const { pushNotification } = useNotifications();

    async function submit() {
      await deleteProject(id.value);
      if (isFinished) {
        isOpen.value = false;
        id.value = "";
        pushNotification({
          id: "",
          title: "Eliminado",
          description: "Proyecto eliminada",
          type: "success",
        });
      }
    }

    const drag = ref(false);
    const sort = ref(true);

    async function updateOrder() {
      if (elementsToOrder.value) {
        await updateOrderProjects(elementsToOrder.value);
        if (isFinished) {
          pushNotification({
            id: "",
            title: "Orden actualizado",
            description: "Tus proyectos se han ordenado",
            type: "success",
          });
        }
      }
    }

    const elements = computed((): ProjectInterface[] | null =>
      projects.value
        ? projects.value.map((element) => {
            return {
              ...element,
              id: element.id,
            };
          })
        : null
    );

    const elementsToOrder = ref(elements.value);

    watch(elements, (value) => {
      elementsToOrder.value = value;
    });
    return {
      projects,
      isOpen,
      id,
      submit,
      drag,
      sort,
      updateOrder,
      elementsToOrder,
    };
  },
});
</script>
