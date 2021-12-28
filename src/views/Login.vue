<template>
  <div class="c-login">
    <div class="c-login__content">
      <img class="c-login__content__logo" :src="require('@/assets/logo.png')" />
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
export default defineComponent({
  components: {
    LoginWithGoogleButton,
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
  @apply h-screen flex items-center justify-center justify-items-center;
  &__content {
    @apply border border-gray-200 bg-white text-black w-96 h-60 rounded-md shadow-sm p-5 flex flex-col justify-around items-center;
    &__logo {
      @apply w-48;
    }
  }
}
</style>
