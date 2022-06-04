<template>
  <Summary v-if="profile" :user="profile" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useProfile } from "@/composables/useProfile";
import Summary from "@/components/summary/Summary.vue";

export default defineComponent({
  components: { Summary },
  props: {
    email: {
      type: String,
      required: true,
      default: null,
    },
  },
  setup(props) {
    const { getProfileByEmail, profile } = useProfile();
    getProfileByEmail(props.email);
    return { profile };
  },
});
</script>
