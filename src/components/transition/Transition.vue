<template>
  <transition
    v-if="!isGroup"
    :enter-active-class="transition['enter-active-class']"
    :enter-from-class="transition['enter-from-class']"
    :enter-to-class="transition['enter-to-class']"
    :leave-active-class="transition['leave-active-class']"
    :leave-from-class="transition['leave-from-class']"
    :leave-to-class="transition['leave-to-class']"
    :mode="mode"
    :appear="appear"
  >
    <slot />
  </transition>
  <transition-group
    v-else
    :tag="tag"
    :enter-active-class="transition['enter-active-class']"
    :enter-from-class="transition['enter-from-class']"
    :enter-to-class="transition['enter-to-class']"
    :leave-active-class="transition['leave-active-class']"
    :leave-from-class="transition['leave-from-class']"
    :leave-to-class="transition['leave-to-class']"
    :move-class="transition['move-class']"
    :appear="appear"
  >
    <slot />
  </transition-group>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
type NameTransitionTypes = "fade" | "slide-fade";
interface TransitionItem {
  "enter-active-class": string;
  "enter-from-class": string;
  "enter-to-class": string;
  "leave-active-class": string;
  "leave-from-class": string;
  "leave-to-class": string;
}
interface Transition {
  fade: TransitionItem;
  "slide-fade": TransitionItem;
}

const props = defineProps({
  name: {
    type: String as PropType<NameTransitionTypes>,
    default: "fade",
    validator: (value: NameTransitionTypes) =>
      ["fade", "slide-fade"].includes(value),
  },
  isGroup: {
    type: Boolean,
  },
  mode: {
    type: String,
    default: "out-in",
  },
  tag: {
    type: String,
    default: undefined,
  },
  appear: {
    type: Boolean,
  },
});
const transitions: Transition = {
  fade: {
    "enter-active-class": "transition-opacity  duration-300",
    "enter-from-class": "opacity-0",
    "enter-to-class": "opacity-100",
    "leave-active-class": "transition-opacity duration-300",
    "leave-from-class": "opacity-100",
    "leave-to-class": "opacity-0",
  } as TransitionItem,
  "slide-fade": {
    "enter-active-class": "transition-all duration-300 ease-linear",
    "enter-from-class": "opacity-0  transform translate-x-2.5",
    "enter-to-class": "opacity-100 transform  translate-x-0",
    "leave-active-class": "transition-all duration-300 ease-linear",
    "leave-from-class": "opacity-100 transform ranslate-x-0",
    "leave-to-class": "opacity-0 transform -translate-x-2.5	",
  } as TransitionItem,
};

const transition = transitions[
  props.name as NameTransitionTypes
] as TransitionItem;
</script>
