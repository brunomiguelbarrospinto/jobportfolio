<template>
  <router-view v-if="readyApp" />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";
import { useFirebase } from "@/composables/useFirebase";

export default defineComponent({
  setup() {
    const { initializeApp } = useFirebase();
    const readyApp = ref(false);
    onBeforeMount(async () => {
      await initializeApp();
      readyApp.value = true;
    });
    return { readyApp };
  },
});
</script>
