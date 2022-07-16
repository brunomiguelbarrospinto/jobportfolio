<template>
  <input
    class="c-input"
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

<style>
.c-input {
  @apply mb-5 block w-full rounded-sm border border-gray-300  p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500;
}
</style>
