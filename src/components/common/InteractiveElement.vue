<template>
  <component
    class="cursor-pointer"
    :is="computedTagName"
    :href="href"
    :to="to"
    v-bind="$props"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
export default defineComponent({
  props: {
    as: {
      type: [String, Object],
    },
    to: {
      type: [String, Object],
    },
    href: {
      type: String,
    },
  },
  setup(props) {
    const computedTagName = computed(() =>
      props.as
        ? props.as
        : props.to
        ? `router-link`
        : props.href
        ? `a`
        : `button`
    );
    return {
      computedTagName,
    };
  },
});
</script>
