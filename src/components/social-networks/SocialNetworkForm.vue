<template>
  <div class="bg-white border p-4">
    <Form :form="SocialNetworkForm(isNewSocialNetwork)" />
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import SocialNetworkForm from "@/config/SocialNetworkForm";

import { useStudies } from "@/composables/useStudies";
export default defineComponent({
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const { getStudyById } = useStudies();
    const socialNetwork = computed(() => getStudyById(props.id));

    const isNewSocialNetwork = computed(
      () => socialNetwork.value === undefined
    );

    return { socialNetwork, isNewSocialNetwork, SocialNetworkForm };
  },
});
</script>
