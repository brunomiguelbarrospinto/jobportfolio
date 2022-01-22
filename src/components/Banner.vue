<template>
  <div class="p-5 flex flex-col items-center justify-center relative">
    <div class="absolute h-full w-full bg-blue-400">
      <img
        v-if="banner?.backgroundImage"
        class="h-full w-full object-cover"
        :src="banner.backgroundImage"
      />
    </div>
    <div
      class="relative flex flex-col items-center justify-between justify-items-center h-full"
    >
      <div />
      <div
        class="flex flex-col items-center justify-center justify-items-center"
      >
        <img
          v-if="banner.showPhoto && aboutMe.photo"
          class="rounded-full border-4 border-white mb-2 w-32 h-32 md:mb-4"
          alt=""
          :src="aboutMe.photo"
        />
        <div
          class="text-white text-3xl md:text-2xl lg:text-3xl font-semibold mb-2 md:mb-4"
        >
          {{ banner.title }}
        </div>
        <div
          class="text-white text-xl md:text-1xl lg:text-2xl font-normal mb-2 md:mb-4"
        >
          {{ banner.subTitle }}
        </div>

        <div
          v-if="banner?.social"
          class="flex items-center justify-center justify-items-center border-t-2 pt-2 md:pt-4 border-gray-200 border-opacity-50"
        >
          <template :key="sn.link + sn.order" v-for="sn in socialNetworks">
            <a
              v-if="sn.link.length"
              class="mr-4 last:mr-0 w-6 flex items-center justify-center justify-items-center"
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
