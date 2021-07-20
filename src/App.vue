<template>
  <router-view v-slot="{ Component }">
    <TransitionComponent>
      <component :is="Component" />
    </TransitionComponent>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TransitionComponent from "@/components/transition/Transition.vue";
export default defineComponent({
  components: { TransitionComponent },
  setup() {
    return {};
  },
});
</script>
