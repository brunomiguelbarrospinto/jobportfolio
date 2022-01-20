<template>
  <span
    class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded"
    :style="`color:${textColor};background-color: ${bgColor}`"
  >
    {{ text }}
  </span>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import getContrastYIQ from "@/utils/getContrastYIQ";

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    },
    bgColor: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const textColor = getContrastYIQ(props.bgColor as string);

    return {
      textColor,
    };
  },
});
</script>
