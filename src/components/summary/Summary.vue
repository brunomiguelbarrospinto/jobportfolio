<template>
  <div>
    <div class="container mx-auto p-20 max-w-6xl">
      <Banner :user="user" class="mb-20" />
      <AboutMe :user="user" class="mb-20" />
      <Languages :user="user" class="mb-20" />
      <Studies :user="user" class="mb-20" />
      <Knowledge :user="user" class="mb-20" />
      <Experiences :user="user" class="mb-20" />
      <ContactMe :user="user" class="mb-20" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { UserInterface } from "@/definitions/entities/UserInterface";
import Banner from "@/components/Banner.vue";
import AboutMe from "./components/AboutMe.vue";
import Languages from "./components/Languages.vue";
import Studies from "./components/Studies.vue";
import Knowledge from "./components/Knowledge.vue";
import Experiences from "./components/Experiences.vue";
import ContactMe from "./components/ContactMe.vue";

export default defineComponent({
  components: {
    Banner,
    AboutMe,
    Languages,
    Studies,
    Knowledge,
    Experiences,
    ContactMe,
  },
  props: {
    user: {
      type: Object as PropType<UserInterface>,
      required: true,
    },
  },
});
</script>
