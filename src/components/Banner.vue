<template>
  <div class="relative overflow-hidden text-white drop-shadow-lg">
    <img class="absolute h-full w-full" alt="" :src="banner?.backgroundImage" />
    <div class="absolute h-full w-full bg-black/10 backdrop-blur-sm" alt="" />

    <div class="container relative mx-auto max-w-4xl px-3 py-3 md:py-28">
      <div class="grid gap-12 md:grid-cols-7">
        <div class="col-span-2">
          <img
            v-if="banner?.showPhoto && aboutMe?.photo"
            class="w-full rounded-full border-4"
            alt=""
            :src="aboutMe.photo"
          />
        </div>
        <div class="col-span-5 grid place-content-center">
          <h1
            class="mb-1 text-2xl font-semibold leading-normal drop-shadow-md md:text-5xl"
          >
            {{ banner?.title?.[currentLocale] }}
          </h1>
          <h2
            class="mb-3 text-xl font-medium leading-normal drop-shadow-md md:text-3xl"
          >
            {{ banner?.subTitle?.[currentLocale] }}
          </h2>
          <h3>
            <div
              class="drop-shadow-md"
              v-html="aboutMe?.biography?.[currentLocale]"
            />
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, computed } from "vue";
import { UserInterface } from "@/definitions/entities/UserInterface";
import useLocale from "@/composables/useLocale";

const props = defineProps({
  user: {
    type: Object as PropType<UserInterface>,
    required: true,
  },
});
const { currentLocale } = useLocale();
const aboutMe = computed(() => props.user.aboutMe);
const banner = computed(() => props.user.banner);
</script>
