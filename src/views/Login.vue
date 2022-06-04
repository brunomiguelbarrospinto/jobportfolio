<template>
  <div class="c-login">
    <div>
      <CardComponent class="c-login__content">
        <Logo />

        {{ $t("Log in") }} <br />
        <LoginWithGoogleButton @login="login" />
      </CardComponent>
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
  @apply fixed flex h-screen w-screen items-center justify-center justify-items-center;
}
</style>
