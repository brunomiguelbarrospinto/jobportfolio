<template>
  <div class="bg-white border p-4">
    <Form
      :form="form"
      :values="user.socialNetworks"
      @form:onSubmit="updateSocialNetworksForm"
      :isLoading="isLoading"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Form from "@/components/common/form/Form.vue";
import SocialNetworksForm from "@/config/SocialNetworksForm";
import { useUser } from "@/composables/useUser";
import { useSocialNetworks } from "@/composables/useSocialNetworks";
import { useRouter } from "vue-router";
import useNotifications from "@/composables/useNotifications";

export default defineComponent({
  components: {
    Form,
  },
  setup() {
    const { user } = useUser();
    const { updateSocialNetworks, isLoading, isFinished } = useSocialNetworks();
    const router = useRouter();
    const { pushNotification } = useNotifications();

    async function updateSocialNetworksForm(data: any) {
      await updateSocialNetworks(data);
      if (isFinished) {
        router.push({ name: "home" });
        pushNotification({
          id: "",
          title: "Información actualizada",
          description: "Redes sociales actualizadas",
          type: "success",
        });
      }
    }
    return {
      form: SocialNetworksForm(),
      user,
      updateSocialNetworksForm,
      isLoading,
      isFinished,
    };
  },
});
</script>
