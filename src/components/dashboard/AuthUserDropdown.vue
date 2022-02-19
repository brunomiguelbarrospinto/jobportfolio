<template>
  <Dropdown>
    <template #activator>
      <button
        class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        id="user-menu"
        aria-haspopup="true"
      >
        <span class="sr-only">Open user menu</span>

        <div class="h-8 w-8 rounded-full bg-gray-500">
          <img
            v-if="aboutMe"
            ref="profileDropdown"
            @click.prevent="toggleDropdown"
            class="h-full w-full rounded-full"
            :src="aboutMe.photo"
            alt=""
          />
        </div>
      </button>
    </template>
    <template #content>
      <DropdownMenuItem>
        <router-link
          :to="{ name: 'profile', params: { email: currentAuthUser.email } }"
          target="_blank"
        >
          Ver perfil
        </router-link>
      </DropdownMenuItem>
      <DropdownMenuItem @click="logout"> Salir </DropdownMenuItem>
    </template>
  </Dropdown>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Dropdown from "@/components/common/dropdown/Dropdown.vue";
import DropdownMenuItem from "@/components/common/dropdown/DropdownMenuItem.vue";
import { useFirebase } from "@/composables/useFirebase";
import { useUser } from "@/composables/useUser";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    Dropdown,
    DropdownMenuItem,
  },
  setup() {
    const { currentAuthUser, signOut } = useFirebase();
    const { aboutMe } = useUser();
    const router = useRouter();
    async function logout() {
      await signOut();
      router.push({ name: "login" });
    }
    return {
      logout,
      currentAuthUser,
      aboutMe,
    };
  },
});
</script>
