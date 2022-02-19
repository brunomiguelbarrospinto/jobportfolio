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
  @apply mb-5 block w-full rounded-sm border  border-gray-200 px-2 py-1 text-xs capitalize transition-colors focus:border-blue-500 focus:outline-none;

  & .option {
    @apply capitalize;
  }
}
</style>
