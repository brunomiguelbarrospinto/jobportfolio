<template>
  <nav
    class="sticky top-0 w-full z-20 bg-white border border-gray-200 border-b"
  >
    <div class="flex items-center justify-between p-3">
      <router-link :to="{ name: 'dashboard' }">
        <img class="w-32" :src="require('@/assets/logo.png')" />
      </router-link>
      <AuthUserDropdown />
    </div>
  </nav>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import AuthUserDropdown from "./AuthUserDropdown.vue";
export default defineComponent({
  components: {
    AuthUserDropdown,
  },
});
</script>
