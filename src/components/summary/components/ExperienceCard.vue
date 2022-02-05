<template>
  <a
    :href="experience.url"
    target="_blank"
    class="c-experience-card"
    :style="`--brand-color: ${experience.brandColor}; --hover-color: ${hoverColor}`"
  >
    <header class="c-experience-card__header">
      <div class="c-experience-card__header__gradient" />
      <div class="c-experience-card__header__logo">
        <img
          v-if="experience.logo"
          class="h-10 w-10 rounded-full border-2 border-white"
          alt=""
          :src="experience.logo"
        />
      </div>
      <div class="c-study-item__header__content">
        <div class="font-medium">
          {{ experience.position }}
        </div>
        <div class="mb-1">
          {{ experience.company }}
        </div>
        <div class="text-xs">
          <span class="capitalize">{{ experience.startShortMonthName }}</span>
          {{ experience.startYear }} -
          <template v-if="experience.current"
            ><span class="font-semibold text-green-500"
              >actualidad
            </span></template
          >
          <template v-else>
            <span class="capitalize">{{
              experience.finishShortMonthName
            }}</span>
            {{ experience.finishYear }}
          </template>
          <span class="text-xs font-medium"> ({{ experience.duration }})</span>
        </div>
      </div>
    </header>
    <!-- <div class="c-experience-card__content">
      {{ experience.description }}
    </div> -->
  </a>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ExperienceModel from "@/models/ExperienceModel";
import getContrastYIQ from "@/utils/getContrastYIQ";
export default defineComponent({
  props: {
    experience: {
      type: Object as PropType<ExperienceModel>,
      required: true,
    },
  },
  setup(props) {
    const hoverColor = getContrastYIQ(props.experience.brandColor as string);
    return {
      hoverColor,
    };
  },
});
</script>

<style lang="scss">
.c-experience-card {
  @apply inline-block rounded border transition-all duration-200;
  border: 2px solid var(--brand-color);

  &:hover {
    background: var(--brand-color);
    color: var(--hover-color);
    @apply shadow-md;
  }
  &__header {
    @apply relative flex w-full  p-3  text-sm;

    // &__gradient {
    //   @apply absolute top-0 left-0 right-0 bottom-0 bg-black opacity-20;
    // }

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
