<template>
  <Form
    :form="StudyForm(isNewStudy)"
    @form:onSubmit="submit"
    :values="study"
    :isLoading="isLoading"
  />
</template>
<script lang="ts" setup>
import Form from "@/components/common/form/Form.vue";

import { computed } from "vue";
import StudyForm from "@/config/StudyForm";
import StudyInterface from "@/definitions/entities/StudyInterface";
import { useStudies } from "@/composables/useStudies";
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
const { getStudyById, isLoading, isFinished, saveStudy } = useStudies();
const study = computed(() => getStudyById(props.id));
const isNewStudy = computed(() => study.value === undefined);

async function submit(data: StudyInterface) {
  await saveStudy({
    id: props.id,
    ...data,
    order: study.value?.order ?? 0,
  });
  if (isFinished) {
    router.push({ name: "dashboard-studies-list" });
    pushNotification({
      id: "",
      title: props.id ? "Actualizado" : "Guardado",
      description: props.id ? "Estudio actualizada" : "Estudio añadido",
      type: "success",
    });
  }
}
</script>
