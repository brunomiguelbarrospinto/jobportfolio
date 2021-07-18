<template>
  <div>
    <Summary v-if="user" :user="user" />
    <button v-if="currentAuthUser" @click="signOut">Sign out</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useFirebase } from "@/composables/useFirebase";
import { useUser } from "@/composables/useUser";
import Summary from "@/components/summary/Summary.vue";

export default defineComponent({
  components: {
    Summary,
  },
  setup() {
    const { currentAuthUser, signOut } = useFirebase();
    const { getUserById, user } = useUser();
    onMounted(() => {
      if (currentAuthUser?.value) {
        getUserById(currentAuthUser.value.uid);
      }
    });
    return { currentAuthUser, signOut, getUserById, user };
  },
});
</script>
