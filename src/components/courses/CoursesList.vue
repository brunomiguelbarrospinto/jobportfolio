<template>
  <div>
    <div class="mb-4 flex items-center justify-between">
      <div>{{ $t("My courses") }}</div>
      <ButtonComponent
        :to="{ name: 'dashboard-courses-create' }"
        :text="$t('Create')"
        size="sm"
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
      <template #item="{ element: course }">
        <ListItem>
          <!-- <template #image>
            <img
              v-if="course.image"
              class="h-8 w-8"
              :src="course.image"
              alt=""
            />
            <template v-else>{{ course.name[0] }}</template>
          </template> -->
          <template #title>
            {{ course.name[currentLocale] }}
          </template>
          <template #subtitle>
            {{ course.description[currentLocale] }}
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
                    name: 'dashboard-courses-edit',
                    params: { id: course.id },
                  }"
                >
                  {{ $t("Edit") }}
                </DropdownMenuItem>
                <DropdownMenuItem
                  @click="
                    id = course.id;
                    isOpen = true;
                  "
                >
                  {{ $t("Delete") }}
                </DropdownMenuItem>
              </template>
            </Dropdown>
          </template>
        </ListItem>
      </template>
    </draggable>
    <CourseModalDelete
      :isOpen="isOpen"
      @close="
        isOpen = false;
        id = '';
      "
      @confirm="submit"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { useCourses } from "@/composables/useCourses";
import ListItem from "@/components/common/list/ListItem.vue";
import Dropdown from "@/components/common/dropdown/Dropdown.vue";
import DropdownMenuItem from "@/components/common/dropdown/DropdownMenuItem.vue";
import useNotifications from "@/composables/useNotifications";
import CourseModalDelete from "./CourseModalDelete.vue";
import draggable from "vuedraggable";
import CourseInterface from "@/definitions/entities/CourseInterface";
import useLocale from "@/composables/useLocale";
import { ButtonComponent } from "vue-vite-components";
import { IconComponent } from "vue-vite-components";

const { courses, deleteCourse, isFinished, updateOrderCourses } = useCourses();
const isOpen = ref(false);
const id = ref("");
const { pushNotification } = useNotifications();
const { currentLocale } = useLocale();

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
</script>
