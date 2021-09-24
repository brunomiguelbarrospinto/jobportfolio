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
    <Icon
      v-if="leftIcon && !isLoading"
      class="button__icon"
      :name="leftIcon"
      :size="size"
    />
    <div class="button__text" v-if="text">{{ text }}</div>
    <Icon
      v-if="rightIcon && !isLoading"
      class="button__icon"
      :name="rightIcon"
      :size="size"
    />
  </InteractiveElement>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import InteractiveElement from "@/components/common/InteractiveElement.vue";
import Icon from "@/components/common/Icon.vue";
export const sizes = ["xs", "sm", "md", "lg", "xl"];
export const colors = ["primary"];

export default defineComponent({
  components: {
    InteractiveElement,
    Icon,
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
    isText: {
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
    text: {
      type: String,
    },
    leftIcon: {
      type: String,
    },
    rightIcon: {
      type: String,
    },
  },
  setup(props) {
    const classList = computed(() => {
      const { isOutline, color, isText } = props;
      const isOutlineClass = isOutline ? "button--outline" : "";
      const isTextClass = isText ? "button--text" : "";
      const colorClass = color ? `button--${color}` : "";
      return `button button--${props.size} ${isOutlineClass} ${colorClass} ${isTextClass}`;
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

$selector: ".button";

#{$selector} {
  // Basic
  @apply cursor-pointer box-border;
  // Display
  @apply flex items-center;
  // Text
  @apply text-#{$default-color} font-medium;
  // Background
  @apply bg-gray-100;
  // Border
  @apply rounded border-0;
  // Transition
  @apply transition duration-300;

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
    // Icon & Text
    #{$selector}__icon + #{$selector}__text {
      @apply ml-1;
    }
    #{$selector}__text + #{$selector}__icon {
      @apply ml-1;
    }
  }
  &--sm {
    @apply text-sm;
    @apply h-8 px-3;
    // Icon & Text
    #{$selector}__icon + #{$selector}__text {
      @apply ml-2;
    }
    #{$selector}__text + #{$selector}__icon {
      @apply ml-2;
    }
  }
  &--md {
    @apply text-base;
    @apply h-10 px-4;
    // Icon & Text
    #{$selector}__icon + #{$selector}__text {
      @apply ml-3;
    }
    #{$selector}__text + #{$selector}__icon {
      @apply ml-3;
    }
  }
  &--lg {
    @apply text-lg;
    @apply h-12 px-5;
    // Icon & Text
    #{$selector}__icon + #{$selector}__text {
      @apply ml-4;
    }
    #{$selector}__text + #{$selector}__icon {
      @apply ml-4;
    }
  }
  &--xl {
    @apply text-xl;
    @apply h-14 px-6;
    // Icon & Text
    #{$selector}__icon + #{$selector}__text {
      @apply ml-5;
    }
    #{$selector}__text + #{$selector}__icon {
      @apply ml-5;
    }
  }

  // Hover
  &:hover {
    @apply hover:bg-gray-200 hover:text-#{$default-hover-color};
  }

  // Focus

  &:focus {
    @apply focus:bg-gray-300  focus:text-#{$default-focus-color};
  }

  // Variants

  &--outline {
    @apply border-2 border-#{$default-color};
    @apply bg-transparent;

    &:hover {
      @apply hover:border-#{$default-color};
    }
    &:focus {
      @apply focus:border-#{$default-focus-color};
    }
  }

  &--text {
    @apply bg-transparent;
    &:hover {
      @apply hover:bg-gray-100;
    }
    &:focus {
      @apply focus:bg-gray-200;
    }
  }

  // Colors

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

    &#{$selector}--outline {
      @apply bg-transparent;
      @apply text-blue-500;
      @apply border-blue-500;
      &:hover {
        @apply hover:bg-blue-600;
        @apply hover:text-white;
        @apply hover:border-blue-600;
      }
      &:focus {
        @apply focus:bg-blue-700;
        @apply focus:text-white;
        @apply focus:border-blue-700;
      }
    }

    &#{$selector}--text {
      @apply bg-transparent;
      @apply text-blue-500;
      &:hover {
        @apply hover:bg-blue-100;
        @apply hover:text-blue-600;
      }
      &:focus {
        @apply focus:bg-blue-200;
        @apply focus:text-blue-700;
      }
    }
  }
}
</style>
