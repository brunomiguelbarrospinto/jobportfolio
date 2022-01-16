<template>
  <div>
    <SectionTitle :user="user">Experiencias</SectionTitle>

    <ExperienceCard
      :key="'experience-card-' + experience.id"
      v-for="experience in user.experiences"
      :experience="experience"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { UserInterface } from "@/definitions/entities/UserInterface";
import SectionTitle from "./SectionTitle.vue";
import ExperienceCard from "./ExperienceCard.vue";
export default defineComponent({
  components: { SectionTitle, ExperienceCard },
  props: {
    user: {
      type: Object as PropType<UserInterface>,
      required: true,
    },
  },
});
</script>
