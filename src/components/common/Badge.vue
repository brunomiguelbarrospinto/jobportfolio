<template>
  <span class="text-xs px-1 rounded" :class="typeClasses"><slot /></span>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    type: {
      type: String,
      default: "default",
    },
  },
  setup(props) {
    const typeClasses = {
      default: "bg-white",
      info: "bg-blue-500 text-white",
      success: "bg-green-500 text-white",
      warning: "bg-yellow-500 text-white",
      danger: "bg-red-500 text-white",
    };

    return {
      typeClasses: typeClasses[props.type],
    };
  },
});
</script>
