<template>
  <a :href="study.url" target="_blank">
    <CardComponent>
      <template v-if="study.image" #image>
        <img
          class="h-10 w-10 border-2 border-white"
          alt=""
          :src="study.image"
        />
      </template>
      <template #title>
        {{ study.title[currentLocale] }}
      </template>
      <template #subtitle>
        {{ study.institute[currentLocale] }}
      </template>
      <template #extra-info>
        <div class="text-xs">
          <span class="capitalize">{{ study.startShortMonthName }}</span>
          {{ study.startYear }} -
          <template v-if="study.current">
            <span class="font-semibold text-green-500"> actualidad </span>
          </template>
          <template v-else>
            <span class="capitalize">{{ study.finishShortMonthName }}</span>
            {{ study.finishYear }}
          </template>
          <span class="text-xs font-medium"> ({{ study.duration }})</span>
        </div>
      </template>
    </CardComponent>
  </a>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import useLocale from "@/composables/useLocale";
import StudyModel from "@/models/StudyModel";
export default defineComponent({
  props: {
    study: {
      type: Object as PropType<StudyModel>,
      required: true,
    },
  },
  setup() {
    const { currentLocale } = useLocale();
    return {
      currentLocale,
    };
  },
});
</script>
