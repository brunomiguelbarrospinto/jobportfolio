<template>
  <div>
    <SectionTitle :user="user">Experiencias</SectionTitle>

    <Scrollsnap class="section-category-by-type__scrollsnap">
      <ExperienceCard
        :key="'experience-card-' + experience.id"
        v-for="experience in experiences"
        :experience="experience"
        class="section-category-by-type__scrollsnap__item"
      />
      <template #go-prev="{ goPrev }">
        <div class="go-prev" @click="goPrev">
          <div class="bg" />

          <Icon name="ChevronLeftIcon" />
        </div>
      </template>
      <template #go-next="{ goNext }">
        <div class="go-next" @click="goNext">
          <div class="bg" />
          <Icon name="ChevronRightIcon" />
        </div>
      </template>
    </Scrollsnap>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { UserInterface } from "@/definitions/entities/UserInterface";
import ExperienceInterface from "@/definitions/entities/ExperienceInterface";
import SectionTitle from "./SectionTitle.vue";
import ExperienceCard from "./ExperienceCard.vue";
import Scrollsnap from "@/components/common/Scrollsnap.vue";
import { useFirebase } from "@/composables/useFirebase";
import Icon from "@/components/common/Icon.vue";

export default defineComponent({
  components: { SectionTitle, ExperienceCard, Scrollsnap, Icon },
  props: {
    user: {
      type: Object as PropType<UserInterface>,
      required: true,
    },
  },
  setup(props) {
    const { convertObjectsCollectionsToArrayCollections } = useFirebase();

    const experiences = computed(() => {
      const experiences = convertObjectsCollectionsToArrayCollections(
        props.user.experiences as ExperienceInterface[]
      );
      if (experiences.every((e) => !e.order)) {
        experiences.reverse();
      }
      return experiences;
    });

    return { experiences };
  },
});
</script>

<style lang="scss">
.section-category-by-type {
  @apply py-10;

  &__scrollsnap {
    @apply container mx-auto;
    &__item {
      min-width: 280px;
      @apply mr-4;
      @apply flex flex-col items-center justify-center;

      &__content {
        @apply flex flex-col items-center justify-center;

        &__img {
          width: 90px;
          height: 90px;
          @apply flex flex-col items-center justify-center mb-7;
          &--skeleton {
            @apply animate-pulse bg-gray-200 h-full w-full;
          }
        }
        &__name {
          @apply text-gray-500;
          &--skeleton {
            @apply animate-pulse bg-gray-200 h-5 w-20;
          }
        }
      }
    }

    .go-prev {
      @apply w-8 absolute left-0 top-0 z-10 flex items-center justify-center h-full cursor-pointer text-white rounded-r-full overflow-hidden;

      .bg {
        @apply absolute left-0 top-0 right-0 bottom-0 bg-black opacity-40;
      }
      svg {
        @apply relative;
      }
    }

    .go-next {
      @apply w-8 absolute right-0 top-0 z-10 flex items-center justify-center h-full cursor-pointer text-white  rounded-l-full overflow-hidden;

      .bg {
        @apply absolute left-0 top-0 right-0 bottom-0 bg-black opacity-40;
      }

      svg {
        @apply relative;
      }
    }
  }
}
</style>
