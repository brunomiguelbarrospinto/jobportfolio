<template>
  <nav
    class="sticky top-0 w-full z-20 bg-white border border-gray-200 border-b"
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
