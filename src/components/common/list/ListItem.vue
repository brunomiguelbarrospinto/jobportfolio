<template>
  <div
    class="
      flex
      items-center
      pt-2
      pb-2
      pr-4
      pl-4
      transition-all
      hover:bg-gray-100 hover:shadow-lg
    "
  >
    <div
      class="
        flex-shrink-0
        w-8
        h-8
        flex
        items-center
        justify-center
        rounded-full
        bg-blue-500
        text-white
      "
    >
      <slot name="image" />
    </div>

    <div class="ml-4 flex-initial flex-shrink-1 w-full truncate">
      <div class="text-sm font-medium text-gray-900 truncate">
        <slot name="title" />
      </div>
      <div class="text-xs text-gray-500 truncate">
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
