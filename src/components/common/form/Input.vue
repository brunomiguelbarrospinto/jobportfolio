<template>
  <input
    class="mb-5 block h-8 w-full rounded-sm border border-gray-200 px-2 py-2 text-xs transition-colors focus:border-blue-500 focus:outline-none"
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

<script lang="ts" setup>
import ErrorMessage from "./ErrorMessage.vue";

defineProps({
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
});
</script>
