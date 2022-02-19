<template>
  <textarea
    :id="id"
    class="mb-5 block w-full rounded-sm border border-gray-200 px-2 py-1 text-xs transition-colors focus:border-blue-500 focus:outline-none"
    v-bind="$attrs"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :rows="rows"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    id: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    modelValue: {
      type: [String, Number],
    },
    rows: {
      type: Number,
      default: 4,
    },
  },
});
</script>
