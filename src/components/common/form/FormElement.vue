<template v-if="isVisible">
  <Label
    v-if="element.data.label"
    :for="element.data.id"
    :label="element.data.label ? $t(element.data.label) : undefined"
  />

  <!-- Input -->
  <Input
    v-if="
      element.type === 'input' &&
      ['text', 'tel', 'date', 'color'].includes(element.data.type)
    "
    v-model="value"
    :id="element.data.id"
    :name="element.data.name"
    :placeholder="
      element.data.placeholder ? $t(element.data.placeholder) : undefined
    "
    :required="element.data.required"
    :type="element.data.type"
  />
  <!-- Input File -->
  <InputFile
    v-if="element.type === 'input' && ['file'].includes(element.data.type)"
    :name="element.data.name"
    v-model="value"
    :id="element.data.id"
    :label="element.data.label"
    :placeholder="
      element.data.placeholder ? $t(element.data.placeholder) : undefined
    "
    :required="element.data.required"
    :type="element.data.type"
  />

  <!-- Datalist -->
  <Datalist
    v-if="element.type === 'datalist'"
    :name="element.data.name"
    v-model="value"
    :id="element.data.id"
    :label="element.data.label"
    :placeholder="
      element.data.placeholder ? $t(element.data.placeholder) : undefined
    "
    :required="element.data.required"
    :options="element.data.options"
  />
  <!-- Checkbox -->
  <Checkbox
    v-if="element.type === 'input' && element.data.type === 'checkbox'"
    :name="element.data.name"
    v-model="value"
    :id="element.data.id"
    :label="element.data.label"
    :placeholder="
      element.data.placeholder ? $t(element.data.placeholder) : undefined
    "
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
    :placeholder="
      element.data.placeholder ? $t(element.data.placeholder) : undefined
    "
    :required="element.data.required"
    :type="element.data.type"
  />
  <!-- Select -->
  <Select
    v-if="['select'].includes(element.type)"
    :name="element.data.name"
    v-model="value"
    :id="element.data.id"
    :label="element.data.label"
    :required="element.data.required"
    :options="element.data.options"
  />
  <!--Textarea-->
  <Textarea
    v-if="element.type === 'textarea'"
    :name="element.data.name"
    v-model="value"
    :id="element.data.id"
    :label="element.data.label"
    :placeholder="
      element.data.placeholder ? $t(element.data.placeholder) : undefined
    "
    :rows="element.data.rows"
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

import Label from "./Label.vue";
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
    Label,
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
      required: true,
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
