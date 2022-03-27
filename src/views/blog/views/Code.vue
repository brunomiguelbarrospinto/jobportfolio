<template>
  <Prism :language="language">
    {{ code }}
  </Prism>
</template>
<script setup lang="ts">
import Prism from "vue-prism-component";

const props = defineProps({
  language: String,
  code: String,
});
</script>

<style scoped>
@import "~prismjs/themes/prism-okaidia.css";
</style>
