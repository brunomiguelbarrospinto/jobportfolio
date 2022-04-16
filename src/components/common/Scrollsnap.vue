<template>
  <div class="c-scroll-snap" :style="`--theme-color: ${props.themeColor}`">
    <div ref="container" class="c-scroll-snap__container">
      <slot />
    </div>
    <!-- INDICATORS-->
    <div v-if="indicators" class="c-scroll-snap__indicators">
      <div
        :key="'c-scroll-snap__indicator-' + n"
        v-for="(n, k) in childrenQuantity"
        @click="navigateToChild(k)"
        :class="k === activeChildIndex ? 'active' : ''"
      />
    </div>
    <!-- LEFT AND RIGHT BUTTONS-->
    <slot
      v-if="!arrivedState.left && hasScroll"
      name="go-prev"
      :goPrev="goPrev"
    >
      <div class="c-scroll-snap__go-prev" @click="goPrev">
        <div class="bg" />

        <IconComponent name="ChevronLeftIcon" />
      </div>
    </slot>
    <slot
      v-if="!arrivedState.right && hasScroll"
      name="go-next"
      :goNext="goNext"
    >
      <div class="c-scroll-snap__go-next" @click="goNext">
        <div class="bg" />
        <IconComponent name="ChevronRightIcon" />
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { useScroll, useWindowSize } from "@vueuse/core";
import { ref, computed, onMounted, watch } from "vue";

const props = defineProps({
  themeColor: { type: String },
  autoSwap: Boolean,
  indicators: Boolean,
});
const container = ref<HTMLElement | null>(null);
const { width } = useWindowSize();

const hasScroll = ref(
  container.value?.scrollWidth > container.value?.clientWidth
);

watch(width, () => {
  hasScroll.value = container.value?.scrollWidth > container.value?.clientWidth;
});

const { x, /*y, isScrolling, directions,*/ arrivedState } =
  useScroll(container);
const childrenQuantity = computed(() => container.value?.children.length);
const activeChildIndex = ref(0);

// FULL PAGE
const navigateToChild = (index: number) => {
  let slide;
  if (index === activeChildIndex.value) return;
  slide = container.value?.children.item(index) as HTMLElement;
  container.value?.scrollTo({
    left: slide.offsetLeft,
    behavior: "smooth",
  });
  activeChildIndex.value = index;
};

function goNext() {
  const slide = container.value?.children.item(0) as HTMLElement;
  container.value?.scrollTo({
    left: x.value + slide.clientWidth,
    behavior: "smooth",
  });
}
function goPrev() {
  const slide = container.value?.children.item(0) as HTMLElement;
  container.value?.scrollTo({
    left: x.value - slide.clientWidth,
    behavior: "smooth",
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce(callback: any, wait: number) {
  let timerId: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

const onScroll = debounce((evt: Event) => {
  const t = evt.target as HTMLElement;
  const sections = [...t.children] as Array<HTMLElement>;
  let newIndex = activeChildIndex.value;

  let n = 0;
  while (n < sections.length && sections[n].offsetLeft <= t.scrollLeft) {
    newIndex = n;
    n++;
  }
  activeChildIndex.value = newIndex;
}, 50);

onMounted(() => {
  container.value?.addEventListener("scroll", onScroll);
  hasScroll.value = container.value?.scrollWidth > container.value?.clientWidth;
});
</script>

<style lang="scss">
$base-class: ".c-scroll-snap";

#{$base-class} {
  overflow: hidden;
  position: relative;
  &__container {
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    overflow-x: scroll;
    margin-bottom: -15px;
    display: flex;
    > * {
      scroll-snap-align: start;
      min-width: 300px;
      margin-right: 20px;
      &:last-of-type {
        margin-right: 0px;
      }
    }
  }

  &__indicators {
    position: absolute;
    display: flex;
    width: 100%;
    justify-content: center;
    bottom: 20px;
    align-items: center;
    & > div {
      cursor: pointer;
      margin-right: 15px;
      width: 20px;
      height: 20px;
      background: rgb(176, 176, 184);
      opacity: 0.5;
      border-radius: 50%;
      transition: all ease 500ms;

      &.active {
        width: 25px;
        height: 25px;
        background: var(--theme-color);
        opacity: 1;
      }
    }
  }

  &__go-prev,
  &__go-next {
    @apply absolute top-0 z-10 hidden h-full w-8 cursor-pointer items-center justify-center overflow-hidden  text-white;

    .bg {
      @apply absolute left-0 top-0 right-0 bottom-0 bg-black opacity-40;
    }
    svg {
      @apply relative;
    }
  }

  &__go-next {
    @apply right-0;
  }

  &:hover {
    #{$base-class}__go-prev,
    #{$base-class}__go-next {
      @apply flex;
    }
  }
}
</style>
