<template>
  <div
    class="
      bg-gray-800
      absolute
      w-screen
      h-screen
      flex
      items-center
      justify-center justify-items-center
    "
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
