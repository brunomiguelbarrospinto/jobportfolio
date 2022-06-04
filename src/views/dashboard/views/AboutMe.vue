<template>
  <Form
    :form="form"
    :values="aboutMe"
    @form:onSubmit="updateAboutMeForm"
    :isLoading="isLoading"
  />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import AboutMeForm from "@/config/AboutMeForm";
import { useAboutMe } from "@/composables/useAboutMe";
import { useRouter } from "vue-router";
import useNotifications from "@/composables/useNotifications";
import { AboutMeInterface } from "@/definitions/entities/UserInterface";

export default defineComponent({
  setup() {
    const { aboutMe, updateAboutMe, isLoading, isFinished } = useAboutMe();
    const router = useRouter();
    const { pushNotification } = useNotifications();

    async function updateAboutMeForm(data: AboutMeInterface) {
      console.log(data);

      await updateAboutMe(data);
      if (isFinished) {
        router.push({ name: "home" });
        pushNotification({
          id: "",
          title: "Información actualizada",
          description: "Actualizado correctamente",
          type: "success",
        });
      }
    }
    return {
      form: AboutMeForm(),
      aboutMe,
      updateAboutMeForm,
      isLoading,
      isFinished,
    };
  },
});
</script>
