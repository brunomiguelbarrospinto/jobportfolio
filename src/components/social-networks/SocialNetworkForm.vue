<template>
  <Form
    :form="SocialNetworkForm(isNewSocialNetwork)"
    @form:onSubmit="submit"
    :isLoading="isLoading"
    :values="socialNetwork"
  />
</template>
<script lang="ts" setup>
import Form from "@/components/common/form/Form.vue";
import { computed } from "vue";
import SocialNetworkForm from "@/config/SocialNetworkForm";
import { useSocialNetworks } from "@/composables/useSocialNetworks";
import useNotifications from "@/composables/useNotifications";
import { useRouter } from "vue-router";
import SocialNetworkInterface from "@/definitions/entities/SocialNetworksInterface";
const props = defineProps({
  id: {
    type: String,
    default: null,
  },
});
const { pushNotification } = useNotifications();
const router = useRouter();

const { getSocialNetworkById, saveSocialNetworks, isLoading, isFinished } =
  useSocialNetworks();
const socialNetwork = computed(() => getSocialNetworkById(props.id));

const isNewSocialNetwork = computed(() => socialNetwork.value === undefined);

async function submit(data: SocialNetworkInterface) {
  await saveSocialNetworks({
    id: props.id,
    ...data,
    order: socialNetwork.value?.order ?? 0,
  });
  if (isFinished) {
    router.push({ name: "dashboard-social-networks-list" });
    pushNotification({
      id: "",
      title: props.id ? "Actualizado" : "Guardado",
      description: props.id ? "Red social actualizada" : "Red social añadida",
      type: "success",
    });
  }
}
</script>
