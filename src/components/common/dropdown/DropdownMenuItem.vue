<template>
  <InteractiveElement
    class="
      block
      px-4
      py-2
      text-sm text-gray-700
      hover:bg-gray-100
      w-full
      text-left
      cursor-pointer
    "
  >
    <slot />
  </InteractiveElement>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InteractiveElement from "@/components/common/InteractiveElement.vue";
export default defineComponent({
  components: {
    InteractiveElement,
  },
});
</script>
