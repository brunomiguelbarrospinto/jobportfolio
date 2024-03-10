<template>
  <Loading v-if="!user" />
  <div v-else>
    <NavbarComponent>
      <template #left-section>
        <router-link :to="{ name: 'dashboard-home' }">
          <Logo />
        </router-link>
      </template>
      <template #right-section>
        <div class="flex">
          <LocaleDropdown class="mr-3" />
          <AuthUserDropdown />
        </div>
      </template>
    </NavbarComponent>
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

<script lang="ts" setup>
import { onMounted } from "vue";
import { useFirebase } from "@/composables/useFirebase";
import { useUser } from "@/composables/useUser";
import TransitionComponent from "@/components/transition/Transition.vue";
import Loading from "@/components/loading/Loading.vue";
import { NavbarComponent } from "vue-vite-components";
import Breadcrumbs from "@/components/common/Breadcrumbs.vue";
import AuthUserDropdown from "@/components/dashboard/AuthUserDropdown.vue";
import LocaleDropdown from "@/components/common/LocaleDropdown.vue";
import Logo from "@/components/common/Logo.vue";

const { currentAuthUser } = useFirebase();
const { getUserById, user, setBaseUser } = useUser();
onMounted(async () => {
  if (currentAuthUser?.value) {
    await getUserById(currentAuthUser.value.uid);
    if (!user.value) {
      await setBaseUser(currentAuthUser.value);
    }
    await getUserById(currentAuthUser.value.uid);
  }
});
</script>
