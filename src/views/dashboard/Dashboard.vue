<template>
  <TransitionComponent>
    <Loading v-if="!user" />
    <div v-else>
      <Navbar />
      <router-view />
      <Summary :user="user" />
    </div>
  </TransitionComponent>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useFirebase } from "@/composables/useFirebase";
import { useUser } from "@/composables/useUser";
import TransitionComponent from "@/components/transition/Transition.vue";
import Loading from "@/components/loading/Loading.vue";
import Summary from "@/components/summary/Summary.vue";
import Navbar from "@/components/navbar/Navbar.vue";

export default defineComponent({
  components: {
    TransitionComponent,
    Loading,
    Summary,
    Navbar,
  },
  setup() {
    const { currentAuthUser } = useFirebase();
    const { getUserById, user } = useUser();
    onMounted(() => {
      if (currentAuthUser?.value) {
        getUserById(currentAuthUser.value.uid);
      }
    });
    return { currentAuthUser, getUserById, user };
  },
});
</script>
