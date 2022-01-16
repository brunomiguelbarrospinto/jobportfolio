<template>
  <div>
    <SectionTitle :user="user">Acerca de mi</SectionTitle>
    <div v-html="user.aboutMe?.biography" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { UserInterface } from "@/definitions/entities/UserInterface";
import SectionTitle from "./SectionTitle.vue";
export default defineComponent({
  components: { SectionTitle },
  props: {
    user: {
      type: Object as PropType<UserInterface>,
      required: true,
    },
  },
});
</script>
