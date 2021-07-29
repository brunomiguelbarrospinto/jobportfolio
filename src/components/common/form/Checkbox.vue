<template>
  <Label :for="id" v-if="label" :label="label" />
  <input
    :id="id"
    v-bind="$attrs"
    :checked="modelValue"
    @change="$emit('update:modelValue', $event.target.checked)"
    class="block mb-5"
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
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
