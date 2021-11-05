<template>
  <form :key="syncedForm" @submit.prevent="onSubmit">
    <template v-if="hasFieldsets">
      <Fieldset
        :key="'fieldset-' + key"
        v-for="(fieldset, key) in syncedForm.fieldsets"
        :fieldset="fieldset"
      />
    </template>
    <slot />
    <Button
      class="ml-auto"
      :disabled="isLoading"
      :isLoading="isLoading"
      type="submit"
      :text="isLoading ? 'Procesando' : 'Guardar'"
      color="primary"
    />
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import Button from "@/components/common/button/Button.vue";

import FormInterface from "@/definitions/form/FormInterface";
import Fieldset from "./Fieldset.vue";
export default defineComponent({
  components: {
    Button,
    Fieldset,
  },
  props: {
    form: {
      type: Object as PropType<FormInterface>,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    values: { type: Object },
  },
  setup(props, context) {
    const hasFieldsets = computed(() => props.form?.fieldsets !== undefined);
    let data = {};
    function onSubmit() {
      if (hasFieldsets.value) {
        formatData(props.form.fieldsets);
        context.emit("form:onSubmit", data);
      }
    }

    function formatData(fieldsets) {
      data = {};
      fieldsets?.forEach((fieldset) => {
        fieldset.elements.forEach((element) => {
          data[element.data.id] =
            element.data.value !== undefined ? element.data.value : null;
        });
      });
    }

    const syncedForm = computed(() => {
      let syncedForm = props.form;
      syncedForm.fieldsets = syncedForm.fieldsets?.map((fieldset) => {
        return {
          ...fieldset,
          elements: fieldset.elements.map((element) => {
            return {
              ...element,
              data: {
                ...element.data,
                value: props?.values
                  ? props?.values[element.data.id] !== undefined
                    ? props.values[element.data.id]
                    : element.data.value
                  : null,
              },
            };
          }),
        };
      });
      return syncedForm;
    });

    return {
      hasFieldsets,
      onSubmit,
      syncedForm,
    };
  },
});
</script>
