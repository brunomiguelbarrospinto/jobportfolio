<template v-if="isVisible">
  <!-- Input -->
  <Input
    v-if="
      element.type === 'input' &&
      ['text', 'tel', 'date'].includes(element.data.type)
    "
    v-model="value"
    :id="element.data.id"
    :label="element.data.label"
    :placeholder="element.data.placeholder"
    :required="element.data.required"
    :type="element.data.type"
  />
  <!-- Input File -->
  <InputFile
    v-if="element.type === 'input' && ['file'].includes(element.data.type)"
    v-model="value"
    :id="element.data.id"
    :label="element.data.label"
    :placeholder="element.data.placeholder"
    :required="element.data.required"
    :type="element.data.type"
  />

  <!-- Datalist -->
  <Datalist
    v-if="element.type === 'datalist'"
    v-model="value"
    :id="element.data.id"
    :label="element.data.label"
    :placeholder="element.data.placeholder"
    :required="element.data.required"
    :options="element.data.options"
  />
  <!-- Checkbox -->
  <Checkbox
    v-if="element.type === 'input' && element.data.type === 'checkbox'"
    v-model="value"
    :id="element.data.id"
    :label="element.data.label"
    :placeholder="element.data.placeholder"
    :required="element.data.required"
    :type="element.data.type"
  />

  <!-- Radio -->
  <Radio
    v-if="element.type === 'input' && element.data.type === 'radio'"
    v-model="value"
    :value="value"
    :name="element.data.name"
    :id="element.data.id"
    :label="element.data.label"
    :placeholder="element.data.placeholder"
    :required="element.data.required"
    :type="element.data.type"
  />
  <!-- Select -->
  <Select
    v-if="['select'].includes(element.type)"
    v-model="value"
    :id="element.data.id"
    :label="element.data.label"
    :required="element.data.required"
    :options="element.data.options"
  />
  <!--Textarea-->
  <Textarea
    v-if="element.type === 'textarea'"
    v-model="value"
    :id="element.data.id"
    :label="element.data.label"
    :placeholder="element.data.placeholder"
    :required="element.data.required"
  />

  <!-- RadioGroup -->
  <RadioGroup
    v-if="element.type === 'radioGroup'"
    :radioGroup="element.data"
    v-model="value"
  />
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import FormElementInterface from "@/definitions/form/FormElementInterface";

import Input from "./Input.vue";
import InputFile from "./InputFile.vue";
import Datalist from "./Datalist.vue";
import Checkbox from "./Checkbox.vue";
import Radio from "./Radio.vue";
import RadioGroup from "./RadioGroup.vue";
import Select from "./Select.vue";
import Textarea from "./Textarea.vue";
export default defineComponent({
  components: {
    Input,
    InputFile,
    Datalist,
    Select,
    Checkbox,
    Radio,
    RadioGroup,
    Textarea,
  },
  props: {
    element: {
      type: Object as PropType<FormElementInterface>,
    },
    elements: {
      type: Array as PropType<FormElementInterface[]>,
    },
    modelValue: {
      type: [String, Number, Boolean],
    },
  },
  setup(props, { emit }) {
    const value = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      },
    });
    const isVisible = computed(() => {
      return props.element?.isVisible !== undefined
        ? props.element.isVisible(props.elements as FormElementInterface[])
        : true;
    });
    return {
      value,
      isVisible,
    };
  },
});
</script>
