<template>
  <div class="bg-white py-12">
    <div class="container mx-auto max-w-screen-xl">
      <div class="grid grid-cols-7 gap-12">
        <div class="col-span-2">
          <img
            v-if="banner?.showPhoto && aboutMe?.photo"
            class="w-full rounded-full border-4"
            alt=""
            :src="aboutMe.photo"
          />
        </div>
        <div class="col-span-5 grid place-content-center">
          <h1 class="mb-1 text-5xl font-bold leading-normal">
            {{ banner?.title }}
          </h1>
          <h1 class="mb-3 text-3xl font-semibold leading-normal">
            {{ banner?.subTitle }}
          </h1>
          <h4 class="mb-8">
            <div v-html="user.aboutMe?.biography" />
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { UserInterface } from "@/definitions/entities/UserInterface";
import { getSocialNetworkIconComponent } from "@/utils/socialNetwork";

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<UserInterface>,
      required: true,
    },
  },
  setup(props) {
    const aboutMe = computed(() => props.user.aboutMe);
    const banner = computed(() => props.user.banner);
    const socialNetworks = computed(() => props.user.socialNetworks);
    return {
      aboutMe,
      banner,
      socialNetworks,
      getSocialNetworkIconComponent,
    };
  },
});
</script>
