<template>
  <div>
    <Summary v-if="user" :user="user" />
    <button v-if="currentAuthUser" @click="logout">Sign out</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useFirebase } from "@/composables/useFirebase";
import { useUser } from "@/composables/useUser";
import { useRouter } from "vue-router";
import Summary from "@/components/summary/Summary.vue";

export default defineComponent({
  components: {
    Summary,
  },
  setup() {
    const { currentAuthUser, signOut } = useFirebase();
    const { getUserById, user } = useUser();
    const router = useRouter();
    onMounted(() => {
      if (currentAuthUser?.value) {
        getUserById(currentAuthUser.value.uid);
      }
    });
    async function logout() {
      await signOut();
      router.push({ name: "login" });
    }
    return { currentAuthUser, logout, getUserById, user };
  },
});
</script>
