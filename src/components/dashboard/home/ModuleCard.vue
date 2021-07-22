<template>
  <router-link :to="{ name: 'home' }" class="flex flex-col p-3 border bg-white">
    <div v-if="module.percent">{{ module.percent }} completado</div>
    <Icon :name="module.iconName" class="mb-2 w-8 h-8" />
    <div>{{ module.text }}</div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Icon from "@/components/common/Icon.vue";

export default defineComponent({
  components: {
    Icon,
  },
  props: {
    module: {
      type: Object,
      required: true,
    },
  },
});
</script>

<style></style>
