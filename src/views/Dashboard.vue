<template>
  <pre>{{ currentAuthUser }}</pre>
  <hr />
  <pre>{{ user }}</pre>
  <button v-if="currentAuthUser" @click="signOut">Sign out</button>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useFirebase } from "@/composables/useFirebase";
import { useUser } from "@/composables/useUser";

export default defineComponent({
  setup() {
    const { currentAuthUser, signOut } = useFirebase();
    const { getUserById, user } = useUser();
    onMounted(() => {
      if (currentAuthUser?.value) getUserById(currentAuthUser.value.uid);
    });
    return { currentAuthUser, signOut, getUserById, user };
  },
});
</script>
