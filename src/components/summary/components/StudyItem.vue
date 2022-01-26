<template>
  <a :href="study.url" target="_blank" class="c-study-item">
    <header class="c-study-item__header">
      <div class="c-study-item__header__gradient" />
      <div class="c-study-item__header__logo">
        <img
          v-if="study.image"
          class="rounded-full border-2 border-white w-10 h-10"
          alt=""
          :src="study.image"
        />
      </div>
      <div class="c-study-item__header__content">
        <div class="font-medium">
          {{ study.title }}
        </div>
        <div class="mb-1">
          {{ study.institute }}
        </div>
        <div class="text-xs">
          <span class="capitalize">{{ study.startShortMonthName }}</span>
          {{ study.startYear }} -
          <template v-if="study.current"
            ><span class="text-green-500 font-semibold"
              >actualidad
            </span></template
          >
          <template v-else>
            <span class="capitalize">{{ study.finishShortMonthName }}</span>
            {{ study.finishYear }}
          </template>
          <span class="text-xs font-medium"> ({{ study.duration }})</span>
        </div>
      </div>
    </header>
  </a>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import StudyModel from "@/models/StudyModel";
export default defineComponent({
  props: {
    study: {
      type: Object as PropType<StudyModel>,
      required: true,
    },
  },
});
</script>

<style lang="scss">
.c-study-item {
  @apply border rounded  transition-all duration-200;

  &:hover {
    @apply shadow-md;
  }
  &__header {
    @apply w-full relative p-3  flex  text-sm;

    &__logo {
      @apply relative mr-3;
    }

    &__content {
      @apply relative;
    }
  }
  &__content {
    @apply p-3 text-sm;
  }
}
</style>
