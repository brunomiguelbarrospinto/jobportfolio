<template>
  <button
    @click="$emit('login', 'google')"
    class="border border-gray-200 pl-2 pr-4 font-medium text-gray-500 rounded flex items-center justify-center hover:shadow-md hover:bg-gray-100 hover:text-gray-600 focus:outline-none active:shadow-none"
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
