<template>
  <span class="rounded px-1 text-xs" :class="typeClasses"><slot /></span>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

type typeClasses =
  | "default"
  | "info"
  | "default"
  | "success"
  | "warning"
  | "danger";

export default defineComponent({
  props: {
    type: {
      type: String as PropType<typeClasses>,
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
