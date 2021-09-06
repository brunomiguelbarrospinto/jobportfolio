<template>
  <div class="bg-white border p-4">
    <Form :form="StudyForm(isNewStudy)" />
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import StudyForm from "@/config/StudyForm";

import { useStudies } from "@/composables/useStudies";
export default defineComponent({
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const { getStudyById } = useStudies();
    const study = computed(() => getStudyById(props.id));

    const isNewStudy = computed(() => study.value === undefined);

    return { study, isNewStudy, StudyForm };
  },
});
</script>
