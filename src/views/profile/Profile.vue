<template>
  <Summary v-if="profile" :user="profile" />
</template>

<script lang="ts" setup>
import { watch } from "vue";
import { useProfile } from "@/composables/useProfile";
import Summary from "@/components/summary/Summary.vue";
import { useTitle } from "@vueuse/core";

const props = defineProps({
  email: {
    type: String,
    required: true,
    default: null,
  },
});

const { getProfileByEmail, profile } = useProfile();
getProfileByEmail(props.email);

watch(
  () => profile.value,
  (value) => {
    useTitle(value?.aboutMe?.name + " " + value?.aboutMe?.lastNames);
  }
);
</script>
