<template>
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
    v-bind="$attrs"
    @input="input($event)"
    :placeholder="placeholder"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    id: {
      type: String,
    },
    placeholder: {
      type: String,
    },
  },
  methods: {
    input(event: Event) {
      let file = (event?.target as HTMLInputElement)?.files?.[0];
      if (file) {
        var reader = new FileReader();
        reader.onload = () => {
          this.$emit("update:modelValue", reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
  },
});
</script>
