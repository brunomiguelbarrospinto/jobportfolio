<template>
  <InteractiveElement
    class="block w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
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
