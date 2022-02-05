<template>
  <div class="border bg-white p-4">
    <Form
      :form="ProjectForm(isNew)"
      @form:onSubmit="submit"
      :values="project"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import ProjectForm from "@/config/ProjectForm";
import ProjectInterface from "@/definitions/entities/ProjectInterface";
import useProjects from "@/composables/useProjects";
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
    const { getProjectById, isLoading, isFinished, saveProject } =
      useProjects();
    const project = computed(() => getProjectById(props.id));
    const isNew = computed(() => project.value === undefined);

    async function submit(data: ProjectInterface) {
      await saveProject({
        id: props.id,
        ...data,
        order: project.value?.order ?? 0,
      });
      if (isFinished) {
        router.push({ name: "dashboard-projects-list" });
        pushNotification({
          id: "",
          title: props.id ? "Actualizado" : "Guardado",
          description: props.id ? "Actualizado" : "Añadido",
          type: "success",
        });
      }
    }

    return { project, isNew, ProjectForm, submit, isLoading, isFinished };
  },
});
</script>
