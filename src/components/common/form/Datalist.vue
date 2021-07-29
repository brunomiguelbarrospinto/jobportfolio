<template>
  <Input
    :id="id"
    :label="label"
    :placeholder="placeholder"
    :modelValue="text"
    @update:modelValue="changeValue"
    :list="'datalist-' + id"
    v-bind="$attrs"
    @blur="validateValue"
    @focus="$emit('update:modelValue', null)"
  />
  <datalist :id="'datalist-' + id">
    <option
      :key="'datalist-' + id + 'option-' + key"
      v-for="(option, key) in options"
      :value="option.value"
    >
      {{ option.text }}
    </option>
  </datalist>
</template>

<script lang="ts">
import { defineComponent, nextTick, computed, PropType } from "vue";
import Input from "./Input.vue";
import OptionInterface from "@/definitions/form/OptionInterface";

export default defineComponent({
  components: {
    Input,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    modelValue: {
      type: [String, Number],
      required: true,
    },
    options: {
      type: Array as PropType<OptionInterface[]>,
      required: true,
    },
  },
  setup(props, context) {
    async function changeValue(value: string | number): Promise<void> {
      context.emit(
        "update:modelValue",
        isNaN(value as number) ? value : parseInt(value as string)
      );
      await nextTick();
      //document.activeElement?.blur();
    }
    function validateValue() {
      if (!props.options.find((option) => option.value == props.modelValue)) {
        context.emit("update:modelValue", null);
      }
    }
    const text = computed(
      () =>
        props.options.find((option) => option.value == props.modelValue)?.text
    );

    return {
      validateValue,
      text,
      changeValue,
    };
  },
});
</script>
