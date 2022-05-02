<template>
  <Form
    :form="ExperienceForm(isNew)"
    @form:onSubmit="submit"
    :values="experience"
  />
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import ExperienceForm from "@/config/ExperienceForm";
import ExperienceInterface from "@/definitions/entities/ExperienceInterface";
import useExperiences from "@/composables/useExperiences";
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
    const { getExperienceById, isLoading, isFinished, saveExperience } =
      useExperiences();
    const experience = computed(() => getExperienceById(props.id));
    const isNew = computed(() => experience.value === undefined);

    async function submit(data: ExperienceInterface) {
      await saveExperience({
        id: props.id,
        ...data,
        order: experience.value?.order ?? 0,
      });
      if (isFinished) {
        router.push({ name: "dashboard-experiences-list" });
        pushNotification({
          id: "",
          title: props.id ? "Actualizado" : "Guardado",
          description: props.id ? "Actualizado" : "Añadido",
          type: "success",
        });
      }
    }

    return { experience, isNew, ExperienceForm, submit, isLoading, isFinished };
  },
});
</script>
