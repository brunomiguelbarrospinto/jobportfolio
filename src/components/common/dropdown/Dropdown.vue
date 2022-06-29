<template>
  <div class="relative">
    <div
      id="activator"
      ref="activator"
      @click.prevent="toggleDropdown"
      class="h-full cursor-pointer"
    >
      <slot name="activator" :isOpen="open" />
    </div>

    <TransitionComponent>
      <div
        v-if="open"
        class="absolute right-0 z-10 mt-2 w-48 origin-top-right overflow-hidden rounded-sm shadow-md ring-1 ring-black ring-opacity-5"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="activator"
      >
        <slot name="content" />
      </div>
    </TransitionComponent>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import TransitionComponent from "@/components/transition/Transition.vue";

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

watch(open, (value) => {
  if (value) {
    document.addEventListener("click", closeDropdown);
  } else {
    document.removeEventListener("click", closeDropdown);
  }
});
</script>
