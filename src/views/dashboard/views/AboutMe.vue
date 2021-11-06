<template>
  <div class="bg-white border p-4">
    <Form
      :form="form"
      :values="user.aboutMe"
      @form:onSubmit="updateAboutMeForm"
      :isLoading="isLoading"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import AboutMeForm from "@/config/AboutMeForm";
import { useUser } from "@/composables/useUser";
import { useAboutMe } from "@/composables/useAboutMe";
import { useRouter } from "vue-router";
import useNotifications from "@/composables/useNotifications";
import { AboutMeInterface } from "@/definitions/entities/UserInterface";

export default defineComponent({
  setup() {
    const { user } = useUser();
    const { updateAboutMe, isLoading, isFinished } = useAboutMe();
    const router = useRouter();
    const { pushNotification } = useNotifications();

    async function updateAboutMeForm(data: AboutMeInterface) {
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
      user,
      updateAboutMeForm,
      isLoading,
      isFinished,
    };
  },
});
</script>
