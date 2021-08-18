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
    :name="name || id"
    v-bind="$attrs"
    :placeholder="placeholder"
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
    autocomplete="off"
  />
  <ErrorMessage v-if="errorMessage">
    {{ errorMessage }}
  </ErrorMessage>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Label from "./Label.vue";
import ErrorMessage from "./ErrorMessage.vue";

export default defineComponent({
  components: {
    Label,
    ErrorMessage,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
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
    errorMessage: {
      type: String,
    },
  },
});
</script>
