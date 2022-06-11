<template>
  <Form
    :form="KnowledgeForm(isNew)"
    @form:onSubmit="submit"
    :values="knowledge"
    :isLoading="isLoading"
  />
</template>
<script lang="ts" setup>
import Form from "@/components/common/form/Form.vue";
import { computed } from "vue";
import KnowledgeForm from "@/config/KnowledgeForm";
import KnowledgeInterface from "@/definitions/entities/KnowledgeInterface";
import useKnowledge from "@/composables/useKnowledge";
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
const { getKnowledgeById, isLoading, isFinished, saveKnowledge } =
  useKnowledge();
const knowledge = computed(() => getKnowledgeById(props.id));
const isNew = computed(() => knowledge.value === undefined);

async function submit(data: KnowledgeInterface) {
  await saveKnowledge({
    id: props.id,
    ...data,
    order: knowledge.value?.order ?? 0,
  });
  if (isFinished) {
    router.push({ name: "dashboard-knowledge-list" });
    pushNotification({
      id: "",
      title: props.id ? "Actualizado" : "Guardado",
      description: props.id ? "Actualizado" : "Añadido",
      type: "success",
    });
  }
}
</script>
