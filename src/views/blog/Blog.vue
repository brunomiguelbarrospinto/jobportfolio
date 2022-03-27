<template>
  <div>
    <Navbar class="sticky">
      <template #left-section>
        <div class="relative">
          <img class="w-32" :src="require('@/assets/logo.png')" />
          <div
            class="absolute -right-6 top-5 -rotate-12 bg-blue-500 px-1 py-0.5 text-xs font-bold uppercase text-white"
          >
            Blog
          </div>
        </div>
      </template>
      <template #right-section>
        <router-link
          class="ml-6 font-semibold text-gray-800"
          :key="'nav-link-' + link.to"
          v-for="link in links"
          :to="'/'"
        >
          {{ link.text }}
        </router-link>
      </template>
    </Navbar>
    <router-view />
  </div>
</template>
<script setup lang="ts">
import Navbar from "@/components/navbar/Navbar.vue";
const links = [
  {
    text: "Inicio",
    to: "/",
  },
  {
    text: "Acerca de mi",
    to: "/",
  },
  {
    text: "Contacto",
    to: "/",
  },
];
</script>
