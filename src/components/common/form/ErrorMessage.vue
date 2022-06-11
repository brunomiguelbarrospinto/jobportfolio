<template>
  <span class="inline-flex text-xs text-red-500">
    <template v-if="errorMessage">{{ errorMessage }}</template>
    <slot />
  </span>
</template>

<script lang="ts" setup>
const props = defineProps({
  errorMessage: {
    type: String,
    default: null,
  },
});
</script>
