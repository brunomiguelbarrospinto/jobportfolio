<template>
  <Form
    :form="ProjectForm(isNew)"
    @form:onSubmit="submit"
    :values="project"
    :isLoading="isLoading"
  />
</template>
<script lang="ts" setup>
import Form from "@/components/common/form/Form.vue";
import { computed } from "vue";
import ProjectForm from "@/config/ProjectForm";
import ProjectInterface from "@/definitions/entities/ProjectInterface";
import useProjects from "@/composables/useProjects";
import useNotifications from "@/composables/useNotifications";
import { useRouter } from "vue-router";

const props = defineProps({
  id: {
    type: String,
    default: null,
  },
});
const { pushNotification } = useNotifications();
const router = useRouter();
const { getProjectById, isLoading, isFinished, saveProject } = useProjects();
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
</script>
