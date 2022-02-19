<template>
  <div>Blog home</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import useSanity from "@/composables/useSanity";
export default defineComponent({
  setup() {
    const { fetch } = useSanity();
    fetch();
    return {};
  },
});
</script>
