<template>
  <div class="bg-white border p-4">
    <Form
      :form="form"
      :values="user.socialNetworks"
      @form:onSubmit="updateSocialNetworksForm"
      @form:onChangeOrder="updateSocialNetworksForm"
      :isLoading="isLoading"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import SocialNetworksForm from "@/config/SocialNetworkForm";
import { useUser } from "@/composables/useUser";
import { useSocialNetworks } from "@/composables/useSocialNetworks";
import { useRouter } from "vue-router";
import useNotifications from "@/composables/useNotifications";

export default defineComponent({
  setup() {
    const { user } = useUser();
    const { updateSocialNetworks, isLoading, isFinished } = useSocialNetworks();
    const router = useRouter();
    const { pushNotification } = useNotifications();

    async function updateSocialNetworksForm(socialNetworks: any) {
      await updateSocialNetworks(
        formatSocialNetworks(socialNetworks.data, socialNetworks.order)
      );

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

    function formatSocialNetworks(socialNetworks: any, order: []) {
      let socialNetworksFormated: any = {};
      order.forEach((element, index) => {
        socialNetworksFormated[element] = {
          link: socialNetworks[element],
          order: index,
        };
      });

      return socialNetworksFormated;
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
