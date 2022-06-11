<template>
  <Label :for="id" class="mb-2">
    <input
      :id="id"
      v-bind="$attrs"
      :checked="modelValue === value"
      :value="value"
      @change="$emit('update:modelValue', modelValue)"
      class="mr-2"
    />

    {{ label }}
  </Label>
</template>

<script lang="ts" setup>
import Label from "./Label.vue";

const props = defineProps({
  id: {
    type: String,
  },
  label: {
    type: String,
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: "",
  },
  value: {
    type: [String, Number],
    required: true,
  },
});
</script>
