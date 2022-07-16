<template>
  <input
    class="mb-5 block w-full rounded-sm border border-gray-200 px-2 py-2 text-xs transition-colors focus:border-blue-500 focus:outline-none"
    :id="id"
    v-bind="$attrs"
    @input="input($event)"
    :placeholder="placeholder"
  />
</template>

<script lang="ts" setup>
defineProps({
  id: {
    type: String,
  },
  placeholder: {
    type: String,
  },
});

const emit = defineEmits(["update:modelValue"]);

function input(event: Event) {
  let file = (event?.target as HTMLInputElement)?.files?.[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = () => {
      emit("update:modelValue", reader.result);
    };
    reader.readAsDataURL(file);
  }
}
</script>
