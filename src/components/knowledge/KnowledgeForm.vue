<template>
  <div class="bg-white border p-4">
    <Form
      :form="KnowledgeForm(isNew)"
      @form:onSubmit="submit"
      :values="knowledge"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import KnowledgeForm from "@/config/KnowledgeForm";
import KnowledgeInterface from "@/definitions/entities/KnowledgeInterface";
import useKnowledge from "@/composables/useKnowledge";
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

    return { knowledge, isNew, KnowledgeForm, submit, isLoading, isFinished };
  },
});
</script>
