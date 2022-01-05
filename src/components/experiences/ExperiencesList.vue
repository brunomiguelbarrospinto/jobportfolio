<template>
  <div>
    <div class="bg-white border p-4">
      <div class="flex justify-between">
        <div>Mis experiencias</div>
        <Button :to="{ name: 'dashboard-experiences-create' }" text="Añadir" />
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
        <template #item="{ element: course }">
          <ListItem>
            <template #image>
              <img
                v-if="course.image"
                class="w-8 h-8"
                :src="course.image"
                alt=""
              />
              <template v-else>{{ course.name[0] }}</template>
            </template>
            <template #title>
              {{ course.name }}
            </template>
            <template #subtitle>
              {{ course.description }}
            </template>
            <template #button>
              <Dropdown>
                <template #activator>
                  <Icon name="DotsVerticalIcon" class="text-red bg-red w-5" />
                </template>
                <template #content>
                  <DropdownMenuItem
                    is="router-link"
                    :to="{
                      name: 'dashboard-courses-edit',
                      params: { id: course.id },
                    }"
                  >
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    @click="
                      id = course.id;
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
    <ExperienceModalDelete
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
import Button from "@/components/common/button/Button.vue";
import { useCourses } from "@/composables/useCourses";
import ListItem from "@/components/common/list/ListItem.vue";
import Dropdown from "@/components/common/dropdown/Dropdown.vue";
import DropdownMenuItem from "@/components/common/dropdown/DropdownMenuItem.vue";
import Icon from "@/components/common/Icon.vue";
import useNotifications from "@/composables/useNotifications";
import ExperienceModalDelete from "./ExperienceModalDelete.vue";
import draggable from "vuedraggable";
import CourseInterface from "@/definitions/entities/CourseInterface";

export default defineComponent({
  components: {
    Button,
    ListItem,
    Dropdown,
    DropdownMenuItem,
    Icon,
    ExperienceModalDelete,
    draggable,
  },
  setup() {
    const { courses, deleteCourse, isFinished, updateOrderCourses } =
      useCourses();
    const isOpen = ref(false);
    const id = ref("");
    const { pushNotification } = useNotifications();

    async function submit() {
      await deleteCourse(id.value);
      if (isFinished) {
        isOpen.value = false;
        id.value = "";
        pushNotification({
          id: "",
          title: "Eliminado",
          description: "Curso eliminado",
          type: "success",
        });
      }
    }

    const drag = ref(false);
    const sort = ref(true);

    async function updateOrder() {
      if (elementsToOrder.value) {
        await updateOrderCourses(elementsToOrder.value);
        if (isFinished) {
          pushNotification({
            id: "",
            title: "Orden actualizado",
            description: "Tus cursos se han ordenado",
            type: "success",
          });
        }
      }
    }

    const elements = computed((): CourseInterface[] | null =>
      courses.value
        ? courses.value.map((element) => {
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
      courses,
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
