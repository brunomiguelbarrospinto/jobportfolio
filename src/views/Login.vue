<template>
  <div>
    <img class="w-48" :src="require('@/assets/logo.png')" />
    <LoginWithGoogleButton />
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
    const { currentAuthUser } = useFirebase();
    const router = useRouter();
    watch(currentAuthUser, (value) => {
      if (value) {
        //router.push({ name: "dashboard" });
      }
    });
    return {};
  },
});
</script>
