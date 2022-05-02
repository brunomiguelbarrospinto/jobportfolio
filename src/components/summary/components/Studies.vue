<template>
  <div>
    <SectionTitle :user="user">Estudios</SectionTitle>

    <Scrollsnap>
      <StudyItem
        :key="'experience-card-' + study.id"
        v-for="study in studies"
        :study="study"
      />
    </Scrollsnap>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { UserInterface } from "@/definitions/entities/UserInterface";
import StudyInterface from "@/definitions/entities/StudyInterface";
import SectionTitle from "./SectionTitle.vue";
import StudyItem from "./StudyItem.vue";
import { useFirebase } from "@/composables/useFirebase";
import Scrollsnap from "@/components/common/Scrollsnap.vue";
import StudyClass from "@/models/StudyModel";

export default defineComponent({
  components: { SectionTitle, StudyItem, Scrollsnap },
  props: {
    user: {
      type: Object as PropType<UserInterface>,
      required: true,
    },
  },
  setup(props) {
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

    return { studies };
  },
});
</script>
