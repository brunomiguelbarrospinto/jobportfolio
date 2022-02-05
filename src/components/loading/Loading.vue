<template>
  <div
    class="absolute flex h-screen w-screen items-center justify-center justify-items-center bg-gray-200"
  >
    <LoadingIcon />
  </div>
</template>
<script>
import { defineComponent } from "vue";
import LoadingIcon from "./LoadingIcon.vue";
export default defineComponent({
  components: {
    LoadingIcon,
  },
});
</script>
