<template>
  <div class="bg-white py-12">
    <div class="container mx-auto max-w-screen-xl">
      <div class="grid grid-cols-7 gap-12">
        <!-- <div class="col-span-2">
          <img
            v-if="banner?.showPhoto && aboutMe?.photo"
            class="w-full rounded-full border-4"
            alt=""
            :src="aboutMe.photo"
          />
        </div> -->
        <div class="col-span-5 grid place-content-center">
          <h1 class="mb-1 text-5xl font-bold leading-normal">
            {{ banner?.title?.[currentLocale] }}
          </h1>
          <h2 class="mb-3 text-3xl font-semibold leading-normal">
            {{ banner?.subTitle?.[currentLocale] }}
          </h2>
          <h3 class="mb-8">
            <div v-html="user.aboutMe?.biography?.[currentLocale]" />
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { UserInterface } from "@/definitions/entities/UserInterface";
import { getSocialNetworkIconComponent } from "@/utils/socialNetwork";
import useLocale from "@/composables/useLocale";

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<UserInterface>,
      required: true,
    },
  },
  setup(props) {
    const { currentLocale } = useLocale();
    const aboutMe = computed(() => props.user.aboutMe);
    const banner = computed(() => props.user.banner);
    const socialNetworks = computed(() => props.user.socialNetworks);
    return {
      aboutMe,
      banner,
      socialNetworks,
      getSocialNetworkIconComponent,
      currentLocale,
    };
  },
});
</script>
