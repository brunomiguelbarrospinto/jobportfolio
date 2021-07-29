<template>
  <Label :for="id" v-if="label" :label="label" />
  <textarea
    :id="id"
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
    v-bind="$attrs"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
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
