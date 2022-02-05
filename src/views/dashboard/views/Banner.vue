<template>
  <div class="border bg-white p-4">
    <Form
      :form="form"
      :values="user?.banner"
      @form:onSubmit="updateBannerForm"
      :isLoading="isLoading"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import BannerForm from "@/config/BannerForm";
import { useUser } from "@/composables/useUser";
import { useBanner } from "@/composables/useBanner";
import { useRouter } from "vue-router";
import useNotifications from "@/composables/useNotifications";
import { BannerInterface } from "@/definitions/entities/UserInterface";

export default defineComponent({
  setup() {
    const { user } = useUser();
    const { updateBanner, isLoading, isFinished } = useBanner();
    const router = useRouter();
    const { pushNotification } = useNotifications();

    async function updateBannerForm(data: BannerInterface) {
      await updateBanner(data);
      if (isFinished) {
        router.push({ name: "home" });
        pushNotification({
          id: "",
          title: "Banner actualizado",
          description: "Banner actualizado correctamente",
          type: "success",
        });
      }
    }
    return {
      form: BannerForm(),
      user,
      updateBannerForm,
      isLoading,
    };
  },
});
</script>
