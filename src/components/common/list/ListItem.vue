<template>
  <div
    class="flex items-center border-t pt-2 pb-2 pr-4 pl-4 transition-all hover:bg-gray-50 hover:shadow-sm"
  >
    <div
      v-if="$slots.image"
      class="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white"
    >
      <slot name="image" />
    </div>

    <div class="flex-shrink-1 w-full flex-initial truncate">
      <div class="truncate text-sm font-medium text-gray-900">
        <slot name="title" />
      </div>
      <div class="truncate text-xs text-gray-500">
        <slot name="subtitle" />
      </div>
    </div>
    <div class="ml-4">
      <slot name="button" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>
