<template>
  <div>
    <Navbar class="sticky">
      <template #left-section>
        <div class="flex items-center">
          <div class="h-8 w-8 rounded-full bg-gray-500">
            <img
              v-if="user.aboutMe"
              ref="profileDropdown"
              @click.prevent="toggleDropdown"
              class="h-full w-full rounded-full"
              :src="user.aboutMe.photo"
              alt=""
            />
          </div>
          <div class="ml-3">{{ user.aboutMe.name }}</div>
        </div></template
      >
      <template #right-section> </template>
    </Navbar>
    <Navbar>
      <template #left-section></template>
      <template #right-section>
        <router-link
          :key="`link-module-${m.id}`"
          v-for="m in modules"
          :to="`#${m.id}`"
          class="ml-4"
        >
          {{ m.linkText }}
        </router-link>
      </template>
    </Navbar>
    <div class="container mx-auto max-w-6xl">
      <Banner :user="user" class="mb-20" />

      <component
        :is="m.component"
        :key="`module-${m.id}`"
        :id="`${m.id}`"
        v-for="m in modules"
        :user="user"
        class="mb-20"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { UserInterface } from "@/definitions/entities/UserInterface";
import Navbar from "@/components/navbar/Navbar.vue";
import Banner from "@/components/Banner.vue";
import AboutMe from "./components/AboutMe.vue";
import Languages from "./components/Languages.vue";
import Studies from "./components/Studies.vue";
import Knowledge from "./components/Knowledge.vue";
import Experiences from "./components/Experiences.vue";
import Projects from "./components/Projects.vue";
import ContactMe from "./components/ContactMe.vue";

export default defineComponent({
  components: {
    Navbar,
    Banner,
  },
  props: {
    user: {
      type: Object as PropType<UserInterface>,
      required: true,
    },
  },
  setup() {
    const modules = [
      {
        id: "about-me",
        linkText: "Acerca de mi",
        component: AboutMe,
      },
      {
        id: "languages",
        linkText: "Idiomas",
        component: Languages,
      },
      {
        id: "studies",
        linkText: "Estudios",
        component: Studies,
      },
      {
        id: "knowledge",
        linkText: "Conocimientos",
        component: Knowledge,
      },
      {
        id: "experiences",
        linkText: "Experiencias",
        component: Experiences,
      },
      {
        id: "projects",
        linkText: "Proyectos",
        component: Projects,
      },
      {
        id: "contact-me",
        linkText: "Contactame",
        component: ContactMe,
      },
    ];
    return {
      modules,
    };
  },
});
</script>
