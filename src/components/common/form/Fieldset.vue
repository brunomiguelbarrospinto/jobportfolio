<template>
  <fieldset class="mb-5 rounded-sm border border-solid p-4">
    <legend
      class="rounded-sm border border-solid py-0.5 px-2 text-sm"
      v-if="fieldset.legend"
    >
      {{ $t(fieldset.legend) }}
    </legend>
    <ButtonComponent
      v-if="fieldset.sortable"
      class="ml-auto"
      leftIcon="SortDescendingIcon"
      text="Cambiar orden"
      isOutline
      size="xs"
      @click="sort = !sort"
    />

    <draggable
      v-model="elements"
      @start="drag = true"
      @end="drag = false"
      item-key="id"
      :sort="sort"
      @change="emitsort"
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
            <ButtonComponent
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
import { defineComponent, PropType, ref, computed } from "vue";
import FormElement from "./FormElement.vue";

export default defineComponent({
  components: {
    FormElement,
    draggable,
  },
  props: {
    fieldset: { type: Object as PropType<FieldsetInterface>, required: true },
  },

  setup(props, context) {
    const drag = ref(false);
    const sort = ref(false);

    const elements = computed(() =>
      props.fieldset.elements.map((element) => {
        return {
          ...element,
          id: element.data.id,
        };
      })
    );

    function emitsort() {
      context.emit("orderChanged", [{ elements: elements.value }]);
    }

    return {
      drag,
      sort,
      elements,
      emitsort,
    };
  },
});
</script>
