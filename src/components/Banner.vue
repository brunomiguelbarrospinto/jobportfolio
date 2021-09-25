<template>
  <div class="p-5 flex flex-col items-center justify-center relative">
    <div class="absolute h-full w-full">
      <img
        class="h-full w-full object-cover"
        :src="user?.banner.backgroundImage"
      />
    </div>
    <div
      class="
        relative
        flex flex-col
        items-center
        justify-between justify-items-center
        h-full
      "
    >
      <div />
      <div
        class="flex flex-col items-center justify-center justify-items-center"
      >
        <img
          v-if="user?.banner.showPhoto && user?.aboutMe.photo"
          class="rounded-full border-4 border-white mb-2 w-32 h-32 md:mb-4"
          alt=""
          :src="user?.aboutMe.photo"
        />
        <div
          class="
            text-white text-3xl
            md:text-2xl
            lg:text-3xl
            font-semibold
            mb-2
            md:mb-4
          "
        >
          {{ user?.banner.title }}
        </div>
        <div
          class="
            text-white text-xl
            md:text-1xl
            lg:text-2xl
            font-normal
            mb-2
            md:mb-4
          "
        >
          {{ user?.banner.subTitle }}
        </div>

        <div
          v-if="user.banner.social"
          class="
            flex
            items-center
            justify-center justify-items-center
            border-t-2
            pt-6
            md:pt-8
            border-gray-200 border-opacity-50
          "
        >
          <a
            :key="sn.link"
            v-for="sn in socialNextworksComputed"
            class="
              mr-4
              w-6
              flex
              items-center
              justify-center justify-items-center
            "
            :href="user.socialNetworks.linkedin"
            target="_blank"
          >
            <component :is="sn.component" class="w-full" color="#fff" />
          </a>
        </div>
      </div>
    </div>
  </div>
  {{ socialNextworksComputed }}
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useUser } from "@/composables/useUser";

import Linkedin from "@/components/common/social/Linkedin.vue";
/*import Facebook from "@/components/common/social/Facebook";
import Twitter from "@/components/common/social/Twitter";
import Instagram from "@/components/common/social/Instagram";
import Pinterest from "@/components/common/social/Pinterest";
import Youtube from "@/components/common/social/Youtube";
import Github from "@/components/common/social/Github";
import Gitlab from "@/components/common/social/Gitlab";
import Patreon from "@/components/common/social/Patreon";
import Behance from "@/components/common/social/Behance";*/

export default defineComponent({
  setup() {
    const { user, socialNetworks } = useUser();

    const socialNextworksComputed = computed(() => {
      console.log(socialNetworks.value);
      if (socialNetworks.value) {
        return Object.keys(socialNetworks.value).map((socialname) => {
          let component;
          if (socialname === "linkedin") {
            component = Linkedin;
          }
          return {
            component: component,
            link: socialNetworks.value?.[socialname],
          };
        });
      }
      return null;
    });

    return {
      user,
      socialNextworksComputed,
    };
  },
});
</script>
