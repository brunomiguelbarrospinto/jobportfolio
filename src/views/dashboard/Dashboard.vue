<template>
  <Loading v-if="!user" />
  <div v-else>
    <Navbar>
      <template #left-section>
        <router-link :to="{ name: 'dashboard-home' }">
          <Logo />
        </router-link>
      </template>
      <template #right-section>
        <AuthUserDropdown />
      </template>
    </Navbar>
    <div class="mx-auto max-w-4xl px-3">
      <Breadcrumbs />
      <router-view v-slot="{ Component }">
        <TransitionComponent>
          <component :is="Component" />
        </TransitionComponent>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useFirebase } from "@/composables/useFirebase";
import { useUser } from "@/composables/useUser";
import TransitionComponent from "@/components/transition/Transition.vue";
import Loading from "@/components/loading/Loading.vue";
import Navbar from "@/components/navbar/Navbar.vue";
import Breadcrumbs from "@/components/common/Breadcrumbs.vue";
import Summary from "@/components/summary/Summary.vue";
import AuthUserDropdown from "@/components/dashboard/AuthUserDropdown.vue";
import Logo from "@/components/common/Logo.vue";

export default defineComponent({
  components: {
    TransitionComponent,
    Loading,
    Navbar,
    Breadcrumbs,
    Summary,
    AuthUserDropdown,
    Logo,
  },
  setup() {
    const { currentAuthUser } = useFirebase();
    const { getUserById, user /*setBaseUser*/ } = useUser();
    onMounted(async () => {
      if (currentAuthUser?.value) {
        await getUserById(currentAuthUser.value.uid);
        // if (!user.value) {
        //   await setBaseUser(currentAuthUser.value);
        //   await getUserById(currentAuthUser.value.uid);
        // }
      }
    });
    return { currentAuthUser, getUserById, user };
  },
});
</script>
