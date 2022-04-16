<template>
  <div>
    <div class="border bg-white p-4">
      <div class="flex justify-between">
        <div>Mis estudios</div>
        <ButtonComponent
          :to="{ name: 'dashboard-studies-create' }"
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
        <template #item="{ element: study }">
          <ListItem>
            <template #image>
              <img
                v-if="study.image"
                class="h-8 w-8"
                :src="study.image"
                alt=""
              />
              <template v-else>{{ study.institute[0] }}</template>
            </template>
            <template #title>
              {{ study.title }}
            </template>
            <template #subtitle>
              {{ study.institute }}
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
                      name: 'dashboard-studies-edit',
                      params: { id: study.id },
                    }"
                  >
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    @click="
                      id = study.id;
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
    </div>
    <StudyModalDelete
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
// TODO: create list components, create useStudies to get, create, update amd delete studies

import { defineComponent, ref, computed, watch } from "vue";

import { useStudies } from "@/composables/useStudies";
import ListItem from "@/components/common/list/ListItem.vue";
import Dropdown from "@/components/common/dropdown/Dropdown.vue";
import DropdownMenuItem from "@/components/common/dropdown/DropdownMenuItem.vue";
import useNotifications from "@/composables/useNotifications";
import StudyModalDelete from "./StudyModalDelete.vue";
import draggable from "vuedraggable";
import StudyInterface from "@/definitions/entities/StudyInterface";

export default defineComponent({
  components: {
    ListItem,
    Dropdown,
    DropdownMenuItem,
    StudyModalDelete,
    draggable,
  },
  setup() {
    const { studies, deleteStudy, isFinished, updateOrderStudies } =
      useStudies();
    const isOpen = ref(false);
    const id = ref("");
    const { pushNotification } = useNotifications();

    async function submit() {
      await deleteStudy(id.value);
      if (isFinished) {
        isOpen.value = false;
        id.value = "";
        pushNotification({
          id: "",
          title: "Eliminado",
          description: "Estudio eliminado",
          type: "success",
        });
      }
    }

    const drag = ref(false);
    const sort = ref(true);

    async function updateOrder() {
      if (elementsToOrder.value) {
        await updateOrderStudies(elementsToOrder.value);
        if (isFinished) {
          pushNotification({
            id: "",
            title: "Orden actualizado",
            description: "Tus estudios se han ordenado",
            type: "success",
          });
        }
      }
    }

    const elements = computed((): StudyInterface[] | null =>
      studies.value
        ? studies.value.map((element) => {
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
      studies,
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
