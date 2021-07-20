<template>
  <div>
    <Loading v-if="!user" />
    <div v-else>
      <Summary :user="user" />
      <button @click="logout">Sign out</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useFirebase } from "@/composables/useFirebase";
import { useUser } from "@/composables/useUser";
import { useRouter } from "vue-router";
import Loading from "@/components/loading/Loading.vue";
import Summary from "@/components/summary/Summary.vue";

export default defineComponent({
  components: {
    Loading,
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
