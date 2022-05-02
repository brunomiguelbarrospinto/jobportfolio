<template>
  <div>
    <SectionTitle :user="user">Experiencias</SectionTitle>

    <ExperienceCard
      :key="'experience-card-' + experience.id"
      v-for="experience in experiences"
      :experience="experience"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { UserInterface } from "@/definitions/entities/UserInterface";
import ExperienceInterface from "@/definitions/entities/ExperienceInterface";
import SectionTitle from "./SectionTitle.vue";
import ExperienceCard from "./ExperienceCard.vue";
import { useFirebase } from "@/composables/useFirebase";
import ExperienceModel from "@/models/ExperienceModel";

export default defineComponent({
  components: { SectionTitle, ExperienceCard },
  props: {
    user: {
      type: Object as PropType<UserInterface>,
      required: true,
    },
  },
  setup(props) {
    const { convertObjectsCollectionsToArrayCollections } = useFirebase();

    const experiences = computed(() => {
      const experiences = convertObjectsCollectionsToArrayCollections(
        props.user.experiences as ExperienceInterface[]
      ).map((e) => new ExperienceModel(e));
      if (experiences.every((e) => !e.order)) {
        experiences.reverse();
      }
      return experiences;
    });

    return { experiences };
  },
});
</script>
