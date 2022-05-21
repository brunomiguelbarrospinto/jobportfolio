<template>
  <div class="c-login">
    <div class="c-login__content">
      <Logo />
      Iniciar sesión
      <LoginWithGoogleButton @login="login" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, watch } from "vue";
import { useFirebase } from "@/composables/useFirebase";
import { useRouter } from "vue-router";
import LoginWithGoogleButton from "@/components/login/LoginWIthGoogleButton.vue";
import Logo from "@/components/common/Logo.vue";
export default defineComponent({
  components: {
    LoginWithGoogleButton,
    Logo,
  },
  setup() {
    const { currentAuthUser, signInWithPopup } = useFirebase();
    const router = useRouter();

    watch(currentAuthUser, (value) => {
      if (value) {
        router.push({ name: "dashboard-home" });
      }
    });
    async function login(platform: string) {
      await signInWithPopup(platform);
    }
    return {
      login,
    };
  },
});
</script>
<style lang="scss">
.c-login {
  @apply flex h-screen items-center justify-center justify-items-center;
  &__content {
    @apply flex h-60 w-96 flex-col items-center justify-around rounded-sm border p-5 text-black shadow-sm;
    &__logo {
      @apply w-48;
    }
  }
}
</style>
