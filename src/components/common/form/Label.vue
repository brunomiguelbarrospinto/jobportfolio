<template>
  <label class="align-center inline-flex cursor-pointer text-xs font-medium">
    <template v-if="label">{{ label }}</template>
    <slot />
  </label>
</template>

<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    default: null,
  },
});
</script>
