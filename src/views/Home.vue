<template>
  <div class="home">
    <p>
      I’m Derek, an astro-engineer based in Tatooine. I like to build X-Wings at
      <a href="#" class="underline decoration-sky-500 decoration-2"
        >My Company, Inc</a
      >. Outside of work, I like to
      <a
        href="#"
        class="underline decoration-pink-500 decoration-dotted decoration-2"
        >watch pod-racing</a
      >
      and have
      <a
        href="#"
        class="underline decoration-indigo-500 decoration-wavy decoration-2"
        >light-saber</a
      >
      fights.
    </p>
    <img
      alt="Vue logo"
      src="../assets/logo.png"
      class="shadow-lg shadow-cyan-500/50"
    />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />

    <p :key="c.id" v-for="c in countries">
      <img
        style="width: 30px"
        :src="require(`@/assets/img/countries/${c.id}.svg`)"
      />
      {{ c }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import countries from "@/data/countries.json";
export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
  },
  setup() {
    return {
      countries,
    };
  },
});
</script>
