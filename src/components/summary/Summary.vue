<template>
  <details>
    <summary>User</summary>
    <pre> {{ user }}</pre>
  </details>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import UserInterface from "@/definitions/entities/UserInterface";
export default defineComponent({
  props: {
    user: {
      type: Object as PropType<UserInterface>,
      required: true,
    },
  },
});
</script>
