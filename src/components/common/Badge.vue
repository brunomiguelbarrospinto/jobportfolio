<template>
  <span class="rounded-sm px-1 text-xs" :class="typeClasses[props.type]"
    ><slot
  /></span>
</template>
<script lang="ts" setup>
import { PropType } from "vue";

type TypeClasses =
  | "default"
  | "info"
  | "default"
  | "success"
  | "warning"
  | "danger";

const props = defineProps({
  type: {
    type: String as PropType<TypeClasses>,
    default: "default",
  },
});
const typeClasses = {
  default: "",
  info: "bg-blue-500 text-white",
  success: "bg-green-500 text-white",
  warning: "bg-yellow-500 text-white",
  danger: "bg-red-500 text-white",
};
</script>
