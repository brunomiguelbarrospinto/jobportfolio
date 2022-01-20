<template>
  <div class="container mx-auto p-20 max-w-6xl">
    <Banner :user="user" class="mb-10" />
    <AboutMe :user="user" class="mb-10" />
    <Studies :user="user" class="mb-10" />
    <Knowledge :user="user" class="mb-10" />
    <Experiences :user="user" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { UserInterface } from "@/definitions/entities/UserInterface";
import Banner from "@/components/Banner.vue";
import AboutMe from "./components/AboutMe.vue";
import Studies from "./components/Studies.vue";
import Knowledge from "./components/Knowledge.vue";
import Experiences from "./components/Experiences.vue";

export default defineComponent({
  components: {
    Banner,
    AboutMe,
    Studies,
    Knowledge,
    Experiences,
  },
  props: {
    user: {
      type: Object as PropType<UserInterface>,
      required: true,
    },
  },
});
</script>
