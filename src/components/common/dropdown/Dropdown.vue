<template>
  <div class="relative">
    <div
      id="activator"
      ref="activator"
      @click.prevent="toggleDropdown"
      class="cursor-pointer"
    >
      <slot name="activator" />
    </div>

    <TransitionComponent>
      <div
        v-if="open"
        class="
          origin-top-right
          absolute
          right-0
          mt-2
          w-48
          rounded-md
          shadow-lg
          bg-white
          ring-1 ring-black ring-opacity-5
          z-10
          overflow-hidden
        "
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="activator"
      >
        <slot name="content" />
      </div>
    </TransitionComponent>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import TransitionComponent from "@/components/transition/Transition.vue";
export default defineComponent({
  components: {
    TransitionComponent,
  },
  setup() {
    const open = ref(false);
    const activator = ref<HTMLElement>();

    function toggleDropdown() {
      open.value = !open.value;
    }

    function closeDropdown(e: Event) {
      if (activator.value) {
        if (!activator.value.contains(e.target as Node)) {
          open.value = false;
        }
      }
    }

    onMounted(() => {
      document.addEventListener("click", closeDropdown);
    });

    onUnmounted(() => {
      document.removeEventListener("click", closeDropdown);
    });

    return {
      open,
      toggleDropdown,
      activator,
    };
  },
});
</script>
