<template>
  <div class="bg-white border p-4">
    <div>{{ id }}</div>
    <div>{{ study }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
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
    return { study };
  },
});
</script>
