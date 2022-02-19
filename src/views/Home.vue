<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
      class="shadow-cyan-500/50 shadow-lg"
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
