<template>
  <Label :for="id" v-if="label" :label="label" />
  <select
    :id="id"
    :value="modelValue"
    v-bind="{
      ...$attrs,
      onChange: ($event) => {
        $emit('update:modelValue', $event.target.value);
      },
    }"
  >
    <option
      v-for="option in options"
      :value="option.value"
      :key="option.value"
      :selected="option.value === modelValue"
    >
      {{ option.text }}
    </option>
  </select>
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
    options: {
      type: Array,
    },
    modelValue: {
      type: [String, Number],
    },
  },
});
</script>
