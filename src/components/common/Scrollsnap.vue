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
      v-if="$slots['go-prev'] && !arrivedState.left"
      name="go-prev"
      :goPrev="goPrev"
    />
    <slot
      v-if="$slots['go-next'] && !arrivedState.right"
      name="go-next"
      :goNext="goNext"
    />
  </div>
</template>

<script setup lang="ts">
import { useScroll } from "@vueuse/core";
import { ref, computed, defineProps, onMounted } from "vue";
const props = defineProps({
  themeColor: { type: String },
  autoSwap: Boolean,
  indicators: Boolean,
});
const container = ref<HTMLElement | null>(null);
const { x, /*y, isScrolling,, directions,*/ arrivedState } =
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
});
</script>

<style lang="scss">
.c-scroll-snap {
  overflow: hidden;
  position: relative;
  &__container {
    scroll-snap-type: x mandatory;
    display: flex;
    justify-content: space-between;
    -webkit-overflow-scrolling: touch;
    overflow-x: scroll;
    margin-bottom: -15px;
    > * {
      scroll-snap-align: start;
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
}
</style>
