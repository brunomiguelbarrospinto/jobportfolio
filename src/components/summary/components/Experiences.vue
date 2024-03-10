<template>
  <div>
    <SectionTitle :user="user">{{ $t("Experiences") }}</SectionTitle>
    <ExperienceCard
      :key="'experience-card-' + experience.id"
      v-for="experience in experiences"
      :experience="experience"
    />
  </div>
</template>

<script lang="ts" setup>
import { PropType, computed } from "vue";
import { UserInterface } from "@/definitions/entities/UserInterface";
import ExperienceInterface from "@/definitions/entities/ExperienceInterface";
import SectionTitle from "./SectionTitle.vue";
import ExperienceCard from "./ExperienceCard.vue";
import { useFirebase } from "@/composables/useFirebase";
import ExperienceModel from "@/models/ExperienceModel";

const props = defineProps({
  user: {
    type: Object as PropType<UserInterface>,
    required: true,
  },
});
const { convertObjectsCollectionsToArrayCollections } = useFirebase();
const experiences = computed(() => {
  const experiences = props?.user?.experiences
    ? convertObjectsCollectionsToArrayCollections(
        props.user.experiences as ExperienceInterface[]
      ).map((e) => new ExperienceModel(e))
    : null;
  if (experiences && experiences.every((e) => !e.order)) {
    experiences.reverse();
  }
  return experiences;
});
</script>
