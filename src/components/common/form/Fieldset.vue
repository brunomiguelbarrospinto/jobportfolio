<template>
  <fieldset class="border border-solid border-gray-200 p-4 mb-5">
    <legend
      class="text-sm bg-blue-500 text-white py-0.5 px-2"
      v-if="fieldset.legend"
    >
      {{ fieldset.legend }}
    </legend>
    <Button
      v-if="fieldset.sortable"
      class="ml-auto"
      leftIcon="SortDescendingIcon"
      text="Cambiar orden"
      isOutline
      size="xs"
    />

    <draggable
      v-model="elements"
      @start="drag = true"
      @end="drag = false"
      item-key="id"
      :sort="sort"
    >
      <template #item="{ element, index }">
        <div class="flex items-center">
          <div class="flex-grow">
            <FormElement
              :element="element"
              :elements="fieldset.elements"
              v-model="element.data.value"
            />
          </div>
          <div v-if="sort">
            <Button
              v-if="fieldset.sortable"
              class="ml-auto cursor-grab"
              :leftIcon="index === 0 ? 'ArrowSmDownIcon' : 'SwitchVerticalIcon'"
              isOutline
              size="xs"
            />
          </div>
        </div>
      </template>
    </draggable>
  </fieldset>
</template>

<script lang="ts">
import draggable from "vuedraggable";

import FieldsetInterface from "@/definitions/form/FieldsetInterface";
import { defineComponent, PropType, ref } from "vue";
import FormElement from "./FormElement.vue";
import Button from "@/components/common/button/Button.vue";
export default defineComponent({
  components: {
    FormElement,
    draggable,
    Button,
  },
  props: {
    fieldset: { type: Object as PropType<FieldsetInterface>, required: true },
  },

  setup(props) {
    const drag = ref(false);
    const sort = ref(false);

    const elements = props.fieldset.elements.map((element) => {
      return {
        ...element,
        id: element.data.id,
      };
    });
    return {
      drag,
      sort,
      elements,
    };
  },
});
</script>
