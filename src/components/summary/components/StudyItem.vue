<template>
  <a :href="study.url" target="_blank">
    <CardComponent>
      <template v-if="study.image" #image>
        <div class="h-10 w-10 border-2 border-white">
          <img width="36" height="36" alt="" :src="study.image" />
        </div>
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
            <span class="font-semibold text-green-700"> actualidad </span>
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

<script lang="ts" setup>
import { PropType } from "vue";
import useLocale from "@/composables/useLocale";
import StudyModel from "@/models/StudyModel";
import { CardComponent } from "vue-vite-components";

const props = defineProps({
  study: {
    type: Object as PropType<StudyModel>,
    required: true,
  },
});
const { currentLocale } = useLocale();
</script>
