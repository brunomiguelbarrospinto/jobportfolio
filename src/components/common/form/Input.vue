<template>
  <input
    class="mb-5 block w-full rounded-sm border border-gray-200 px-2 py-2 text-xs transition-colors focus:border-blue-500 focus:outline-none"
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
import ErrorMessage from "./ErrorMessage.vue";

export default defineComponent({
  components: {
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
