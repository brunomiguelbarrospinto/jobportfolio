<template>
  <label class="text-xs inline-flex align-center cursor-pointer font-semibold">
    <template v-if="label">{{ label }}</template>
    <slot />
  </label>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    label: {
      type: String,
      default: null,
    },
  },
});
</script>
