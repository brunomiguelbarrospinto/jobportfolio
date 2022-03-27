<template>
  <component :is="highlightjs" :language="language" :code="code" />
</template>
<script setup lang="ts">
import "highlight.js/lib/common";
import hljsVuePlugin from "@highlightjs/vue-plugin";

const props = defineProps({
  language: String,
  code: String,
});
const highlightjs = hljsVuePlugin.component;
</script>

<style>
@import "~highlight.js/styles/monokai-sublime.css";
p {
  @apply my-4;
}
</style>
