<template>
  <Label :label="radioGroup.label" />
  <Radio
    v-for="radio in radioGroup.radios"
    :key="radio.id"
    :value="radioGroup.value"
    :name="radioGroup.name"
    v-model="radio.value"
    :id="radio.id"
    :label="radio.label"
    :placeholder="radio.placeholder"
    :required="radio.required"
    :type="radio.type"
    @update:modelValue="(value) => $emit('update:modelValue', value)"
  />
</template>

<script lang="ts" setup>
import Label from "./Label.vue";
import Radio from "./Radio.vue";

defineProps({
  radioGroup: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: [String, Number],
  },
});
</script>
