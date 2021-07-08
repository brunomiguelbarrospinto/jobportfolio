<template>
  <div>Public profile {{ email }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  props: {
    email: {
      type: String,
      required: true,
      default: null,
    },
  },
});
</script>
