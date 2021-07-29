<template>
  <fieldset class="border border-solid border-gray-200 p-4">
    <legend class="text-sm bg-gray-600 text-white px-1" v-if="fieldset.legend">
      {{ fieldset.legend }}
    </legend>
    <FormElement
      :key="key"
      v-for="(element, key) in fieldset.elements"
      :element="element"
      :elements="fieldset.elements"
      v-model="element.data.value"
    />
  </fieldset>
</template>

<script lang="ts">
import FieldsetInterface from "@/definitions/form/FieldsetInterface";
import { defineComponent, PropType } from "vue";
import FormElement from "./FormElement.vue";
export default defineComponent({
  props: {
    fieldset: { type: Object as PropType<FieldsetInterface>, required: true },
  },
  components: {
    FormElement,
  },
});
</script>
