<template>
  <div class="relative flex flex-col items-center justify-center p-5">
    <div class="absolute h-full w-full bg-blue-400">
      <img
        v-if="banner?.backgroundImage"
        class="h-full w-full object-cover"
        :src="banner.backgroundImage"
      />
    </div>
    <div
      class="relative flex h-full flex-col items-center justify-between justify-items-center"
    >
      <div />
      <div
        class="flex flex-col items-center justify-center justify-items-center"
      >
        <img
          v-if="banner?.showPhoto && aboutMe?.photo"
          class="mb-2 h-32 w-32 rounded-full border-4 border-white md:mb-4"
          alt=""
          :src="aboutMe.photo"
        />
        <div
          class="mb-2 text-3xl font-semibold text-white md:mb-4 md:text-2xl lg:text-3xl"
        >
          {{ banner.title }}
        </div>
        <div
          class="md:text-1xl mb-2 text-xl font-normal text-white md:mb-4 lg:text-2xl"
        >
          {{ banner.subTitle }}
        </div>

        <div
          v-if="banner?.social"
          class="flex items-center justify-center justify-items-center border-t-2 border-gray-200 border-opacity-50 pt-2 md:pt-4"
        >
          <template :key="sn.link + sn.order" v-for="sn in socialNetworks">
            <a
              v-if="sn.link.length"
              class="mr-4 flex w-6 items-center justify-center justify-items-center last:mr-0"
              :href="sn.link"
              target="_blank"
            >
              <component
                :is="getSocialNetworkIconComponent(sn.name)"
                color="#fff"
              />
            </a>
          </template>
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
