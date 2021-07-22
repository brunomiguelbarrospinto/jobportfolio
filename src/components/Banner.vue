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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUser } from "@/composables/useUser";
export default defineComponent({
  setup() {
    const { user } = useUser();
    return {
      user,
    };
  },
});
</script>
