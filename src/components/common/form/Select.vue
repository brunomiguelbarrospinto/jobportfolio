<template>
  <select
    :id="id"
    :value="modelValue"
    v-bind="{
      ...$attrs,
      onChange: ($event) => {
        $emit('update:modelValue', $event.target.value);
      },
    }"
    class="select"
  >
    <option
      v-for="option in options"
      :value="option.value"
      :key="option.value"
      :selected="option.value === modelValue"
      class="option"
    >
      {{ option.text }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Label from "./Label.vue";

export default defineComponent({
  props: {
    id: {
      type: String,
    },

    options: {
      type: Array,
    },
    modelValue: {
      type: [String, Number],
    },
  },
});
</script>

<style lang="scss">
.select {
  @apply block text-xs w-full px-2 py-1  border border-gray-200 rounded-sm focus:outline-none focus:border-blue-500 transition-colors mb-5 capitalize;

  & .option {
    @apply capitalize;
  }
}
</style>
