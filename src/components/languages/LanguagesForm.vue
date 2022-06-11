<template>
  <Form
    :form="LanguageForm({ isNew, locale: currentLocale })"
    @form:onSubmit="submit"
    :values="knowledge"
    :isLoading="isLoading"
  />
</template>
<script lang="ts" setup>
import Form from "@/components/common/form/Form.vue";
import { computed } from "vue";
import LanguageForm from "@/config/LanguageForm";
import LanguageInterface from "@/definitions/entities/LanguageInterface";
import useLanguages from "@/composables/useLanguages";
import useNotifications from "@/composables/useNotifications";
import { useRouter } from "vue-router";
import useLocale from "@/composables/useLocale";

const props = defineProps({
  id: {
    type: String,
    default: null,
  },
});
const { pushNotification } = useNotifications();
const router = useRouter();
const { getLanguageById, isLoading, isFinished, saveLanguage } = useLanguages();
const knowledge = computed(() => getLanguageById(props.id));
const isNew = computed(() => knowledge.value === undefined);
const { currentLocale } = useLocale();

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
</script>
