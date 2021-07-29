<template>
  <Label v-if="label" :for="id" :label="label" />
  <input
    class="
      block
      text-xs
      w-full
      px-2
      py-1
      border border-gray-200
      rounded-sm
      focus:outline-none focus:border-blue-500
      transition-colors
      mb-5
    "
    :id="id"
    v-bind="$attrs"
    :placeholder="placeholder"
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
    autocomplete="off"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Label from "./Label.vue";

export default defineComponent({
  components: {
    Label,
  },
  props: {
    id: {
      type: String,
    },
    label: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    modelValue: {
      type: [String, Number],
    },
  },
});
</script>
