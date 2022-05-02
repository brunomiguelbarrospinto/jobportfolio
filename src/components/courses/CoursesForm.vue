<template>
  <Form :form="CourseForm(isNew)" @form:onSubmit="submit" :values="course" />
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import CourseForm from "@/config/CourseForm";
import CourseInterface from "@/definitions/entities/CourseInterface";
import { useCourses } from "@/composables/useCourses";
import useNotifications from "@/composables/useNotifications";
import { useRouter } from "vue-router";
export default defineComponent({
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const { pushNotification } = useNotifications();
    const router = useRouter();
    const { getCourseById, isLoading, isFinished, saveCourse } = useCourses();
    const course = computed(() => getCourseById(props.id));
    const isNew = computed(() => course.value === undefined);

    async function submit(data: CourseInterface) {
      await saveCourse({
        id: props.id,
        ...data,
        order: course.value?.order ?? 0,
      });
      if (isFinished) {
        router.push({ name: "dashboard-courses-list" });
        pushNotification({
          id: "",
          title: props.id ? "Actualizado" : "Guardado",
          description: props.id ? "Actualizado" : "Añadido",
          type: "success",
        });
      }
    }

    return { course, isNew, CourseForm, submit, isLoading, isFinished };
  },
});
</script>
