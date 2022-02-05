<template>
  <input
    :id="id"
    v-bind="$attrs"
    :checked="modelValue"
    @change="$emit('update:modelValue', $event.target.checked)"
    class="mb-5 block"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    id: {
      type: String,
    },

    modelValue: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
