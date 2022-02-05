<template>
  <div class="border bg-white p-4">
    <Form
      :form="LanguageForm(isNew)"
      @form:onSubmit="submit"
      :values="knowledge"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import LanguageForm from "@/config/LanguageForm";
import LanguageInterface from "@/definitions/entities/LanguageInterface";
import useLanguages from "@/composables/useLanguages";
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
    const { getLanguageById, isLoading, isFinished, saveLanguage } =
      useLanguages();
    const knowledge = computed(() => getLanguageById(props.id));
    const isNew = computed(() => knowledge.value === undefined);

    async function submit(data: LanguageInterface) {
      await saveLanguage({
        id: props.id,
        ...data,
        order: knowledge.value?.order ?? 0,
      });
      if (isFinished) {
        router.push({ name: "dashboard-languages-list" });
        pushNotification({
          id: "",
          title: props.id ? "Actualizado" : "Guardado",
          description: props.id ? "Actualizado" : "Añadido",
          type: "success",
        });
      }
    }

    return { knowledge, isNew, LanguageForm, submit, isLoading, isFinished };
  },
});
</script>
