<template>
  <span class="block inline-flex text-xs text-red-500">
    <template v-if="errorMessage">{{ errorMessage }}</template>
    <slot />
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    errorMessage: {
      type: String,
      default: null,
    },
  },
});
</script>
