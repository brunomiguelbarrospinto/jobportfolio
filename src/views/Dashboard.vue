<template>
  <pre>{{ currentAuthUser }}</pre>
  <button v-if="currentAuthUser" @click="signOut">Sign out</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useFirebase } from "@/composables/useFirebase";

export default defineComponent({
  setup() {
    const { currentAuthUser, signOut } = useFirebase();
    return { currentAuthUser, signOut };
  },
});
</script>
