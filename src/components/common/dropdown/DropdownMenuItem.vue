<template>
  <InteractiveElementComponent
    class="block w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
  >
    <slot />
  </InteractiveElementComponent>
</template>
<script lang="ts" setup>
import { InteractiveElementComponent } from "vue-vite-components";
</script>
