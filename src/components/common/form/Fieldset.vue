<template>
  <fieldset class="mb-5 rounded-sm border border-solid p-4">
    <legend
      class="rounded-sm border border-solid py-0.5 px-2 text-sm"
      v-if="fieldset.legend"
    >
      {{ $t(fieldset.legend) }}
    </legend>

    <FormElement
      v-for="(element, key) in elements"
      :key="'form-element-' + key"
      :element="element"
      :elements="fieldset.elements"
      v-model="element.data.value"
    />
  </fieldset>
</template>

<script lang="ts" setup>
import FieldsetInterface from "@/definitions/form/FieldsetInterface";
import { PropType, computed } from "vue";
import FormElement from "./FormElement.vue";

const props = defineProps({
  fieldset: { type: Object as PropType<FieldsetInterface>, required: true },
});

const elements = computed(() =>
  props.fieldset.elements.map((element) => {
    return {
      ...element,
      id: element.data.id,
    };
  })
);
</script>
