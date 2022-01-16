<template>
  <div>
    <Banner :user="user" />

    <hr />
    <h1>Acerca de mi</h1>

    <div v-html="user.aboutMe.biography" />
    <details>
      <summary>User</summary>
      {{ user }}
    </details>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { UserInterface } from "@/definitions/entities/UserInterface";
import Banner from "@/components/Banner.vue";

export default defineComponent({
  components: {
    Banner,
  },
  props: {
    user: {
      type: Object as PropType<UserInterface>,
      required: true,
    },
  },
});
</script>
