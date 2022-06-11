<template>
  <a :href="experience.url" target="_blank" class="mb-5 block">
    <CardComponent>
      <template v-if="experience.logo" #image>
        <div class="h-10 w-10">
          <img class="border-2 border-white" alt="" :src="experience.logo" />
        </div>
      </template>
      <template #title>
        {{ experience.position[currentLocale] }}
      </template>
      <template #subtitle>
        {{ experience.company }}
      </template>
      <template #extra-info>
        <span class="capitalize">{{ experience.startShortMonthName }}</span>
        {{ experience.startYear }} -
        <template v-if="experience.current">
          <span class="font-semibold text-green-700">{{ $t("Present") }} </span>
        </template>
        <template v-else>
          <span class="capitalize">{{ experience.finishShortMonthName }}</span>
          {{ experience.finishYear }}
        </template>
        <span class="text-xs font-medium"> ({{ experience.duration }})</span>
      </template>
      <template #content>
        {{ experience.description[currentLocale] }}
      </template>
    </CardComponent>
  </a>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import ExperienceModel from "@/models/ExperienceModel";
import useLocale from "@/composables/useLocale";
import { CardComponent } from "vue-vite-components";

const props = defineProps({
  experience: {
    type: Object as PropType<ExperienceModel>,
    required: true,
  },
});
const { currentLocale } = useLocale();
</script>
