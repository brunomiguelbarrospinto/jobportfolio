<template>
  <a
    :href="experience.url"
    target="_blank"
    class="c-experience-card"
    :style="`border: 2px solid ${experience.brandColor}`"
  >
    <header class="c-experience-card__header">
      <div class="c-experience-card__header__gradient" />
      <div class="c-experience-card__header__logo">
        <img
          v-if="experience.logo"
          class="rounded-full border-2 border-white w-10 h-10"
          alt=""
          :src="experience.logo"
        />
      </div>
      <div class="c-experience-card__header__content">
        <div class="font-medium">
          {{ experience.company }}
        </div>
        <div>
          {{ experience.position }}
        </div>
      </div>
    </header>
    <div class="c-experience-card__content">
      {{ experience.description }}
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ExperienceInterface from "@/definitions/entities/ExperienceInterface";
export default defineComponent({
  props: {
    experience: {
      type: Object as PropType<ExperienceInterface>,
      required: true,
    },
  },
});
</script>

<style lang="scss">
.c-experience-card {
  @apply border rounded block;
  &__header {
    @apply w-full relative p-3 pb-0 flex text-black text-sm;

    // &__gradient {
    //   @apply absolute top-0 left-0 right-0 bottom-0 bg-black opacity-20;
    // }

    &__logo {
      @apply relative mr-4;
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
