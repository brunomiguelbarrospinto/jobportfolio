<template>
  <InteractiveElement :class="classList" :disabled="isDisabled">
    <svg
      v-if="isLoading"
      class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <slot />
  </InteractiveElement>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import InteractiveElement from "@/components/common/InteractiveElement.vue";

export const sizes = ["xs", "sm", "md", "lg", "xl"];
export const colors = ["primary"];

export default defineComponent({
  components: {
    InteractiveElement,
  },
  props: {
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isOutline: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "md",
      validator: (value: string) => {
        return sizes.includes(value);
      },
    },
    color: {
      type: String,
      validator: (value: string) => {
        return colors.includes(value);
      },
    },
  },
  setup(props) {
    const classList = computed(() => {
      const { isOutline, color } = props;
      const isOutlineClass = isOutline ? "button--outline" : "";
      const colorClass = color ? `button--${color}` : "";
      return `button button--${props.size} ${isOutlineClass} ${colorClass}`;
    });
    return {
      classList,
    };
  },
});
</script>

<style lang="scss">
$default-color: "gray-500";
$default-hover-color: "gray-700";
$default-focus-color: "gray-800";
.button {
  // Basic
  @apply cursor-pointer;
  // Display
  @apply flex items-center;
  // Text
  @apply text-#{$default-color} font-medium;
  // Background
  @apply bg-gray-100;
  // Border
  @apply rounded border-0;
  // Transition
  @apply transition duration-500;

  // Disabled
  &[disabled],
  &[disabled="disabled"],
  &:disabled {
    @apply opacity-50 pointer-events-none;
  }

  // Sizes
  &--xs {
    @apply text-xs;
    @apply h-6 px-2;
  }
  &--sm {
    @apply text-sm;
    @apply h-8 px-3;
  }
  &--md {
    @apply text-base;
    @apply h-10 px-4;
  }
  &--lg {
    @apply text-lg;
    @apply h-12 px-5;
  }
  &--xl {
    @apply text-xl;
    @apply h-14 px-6;
  }

  // Hover
  &:hover {
    @apply hover:bg-gray-200 hover:text-#{$default-hover-color};
  }

  &:focus {
    @apply focus:bg-gray-300  focus:text-#{$default-focus-color};
  }

  &--outline {
    @apply border border-#{$default-color};
    &:hover {
      @apply border-#{$default-color};
    }
    &:focus {
      @apply focus:border-#{$default-focus-color};
    }
  }

  &--primary {
    // Background
    @apply bg-blue-500;
    // Text
    @apply text-white;

    &:hover {
      @apply hover:bg-blue-600 hover:text-white;
    }
    &:focus {
      @apply focus:bg-blue-700 focus:text-white;
    }
  }
}
</style>
