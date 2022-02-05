<template>
  <nav
    class="sticky top-0 z-20 w-full border border-b border-gray-200 bg-white"
  >
    <div class="flex items-center justify-between p-3">
      <slot name="left-section"></slot>
      <slot name="right-section"></slot>
    </div>
  </nav>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  components: {},
});
</script>
