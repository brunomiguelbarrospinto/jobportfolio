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
    modelValue: {
      type: [String, Number, Boolean],
      default: "",
    },
    value: {
      type: [String, Number],
      required: true,
    },
  },
});
</script>
