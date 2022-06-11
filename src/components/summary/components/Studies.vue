<template>
  <div>
    <SectionTitle :user="user">{{ $t("Studies") }}</SectionTitle>

    <StudyItem
      class="mb-5 block"
      :key="'experience-card-' + study.id"
      v-for="study in studies"
      :study="study"
    />
  </div>
</template>

<script lang="ts" setup>
import { PropType, computed } from "vue";
import { UserInterface } from "@/definitions/entities/UserInterface";
import StudyInterface from "@/definitions/entities/StudyInterface";
import SectionTitle from "./SectionTitle.vue";
import StudyItem from "./StudyItem.vue";
import { useFirebase } from "@/composables/useFirebase";
import StudyClass from "@/models/StudyModel";

const props = defineProps({
  user: {
    type: Object as PropType<UserInterface>,
    required: true,
  },
});
const { convertObjectsCollectionsToArrayCollections } = useFirebase();

const studies = computed(() => {
  const studies = convertObjectsCollectionsToArrayCollections(
    props.user.studies as StudyInterface[]
  ).map((s) => new StudyClass(s));
  if (studies.every((e) => !e.order)) {
    studies.reverse();
  }
  return studies;
});
</script>
