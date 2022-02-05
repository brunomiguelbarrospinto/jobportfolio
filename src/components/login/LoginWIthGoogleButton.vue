<template>
  <button
    @click="$emit('login', 'google')"
    class="focus:outline-none flex items-center justify-center rounded border border-gray-200 pl-2 pr-4 font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-600 hover:shadow-md active:shadow-none"
  >
    <img :src="require('@/assets/GGoogle.svg')" />
    Usar cuenta de Google
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    return {};
  },
});
</script>
