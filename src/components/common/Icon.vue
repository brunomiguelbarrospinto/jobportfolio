<template>
  <component v-if="isMounted && heroicon" :class="classList" :is="heroicon" />
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed, PropType } from "vue";
import * as SolidIcons from "@heroicons/vue/solid";
import * as OutlineIcons from "@heroicons/vue/outline";

export const types = ["solid", "outline"];
export const solidIconNames = Object.keys(SolidIcons);
export const outlineIconNames = Object.keys(OutlineIcons);
export const iconNames = [...new Set([...solidIconNames, ...outlineIconNames])];
export const sizes = ["xs", "sm", "md", "lg", "xl"];

type IconTypes = "solid" | "outline";
export default defineComponent({
  props: {
    // https://heroicons.com
    // https://github.com/tailwindlabs/heroicons
    name: {
      type: String as PropType<IconTypes>,
      validator: (value: string) => iconNames.includes(value),
    }, // Prop "name" must be in PascalCase like "ArrowSmLeft"
    type: {
      type: String,
      default: "solid",
      validator: (value: string) => types.includes(value),
    }, // solid || outline
    size: {
      type: String,
      default: "md",
      validator: (value: string) => {
        return sizes.includes(value);
      },
    },
  },
  setup(props) {
    const isMounted = ref(false);
    let heroicon;
    if (props.name) {
      // eslint-disable-next-line
      heroicon =
        props.type === "solid"
          ? SolidIcons[props.name]()
          : OutlineIcons[props.name]();
    }
    const classList = computed(() => {
      const { size } = props;

      return `svg svg--${size} `;
    });
    onMounted(() => (isMounted.value = true));
    return {
      isMounted,
      heroicon,
      classList,
    };
  },
});
</script>

<style lang="scss">
.svg {
  @apply inline;
  &--xs {
    @apply h-4 w-4;
  }
  &--sm {
    @apply h-5 w-5;
  }
  &--md {
    @apply h-6 w-6;
  }
  &--lg {
    @apply h-7 w-7;
  }
  &--xl {
    @apply h-8 w-8;
  }
}
</style>
