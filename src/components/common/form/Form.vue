<template>
  <form @submit.prevent="onSubmit">
    <template v-if="hasFieldsets">
      <Fieldset
        :key="'fieldset-' + key"
        v-for="(fieldset, key) in syncedForm.fieldsets"
        :fieldset="fieldset"
      />
    </template>
    <slot />
    <ButtonComponent
      class="ml-auto"
      :disabled="isLoading"
      :isLoading="isLoading"
      type="submit"
      :text="buttonText"
      color="default"
    />
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";

import FieldsetInterface from "@/definitions/form/FieldsetInterface";
import FormInterface from "@/definitions/form/FormInterface";
import Fieldset from "./Fieldset.vue";
export default defineComponent({
  components: {
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
        formatData(props.form.fieldsets as FieldsetInterface[]);
        context.emit("form:onSubmit", data);
      }
    }

    function formatData(fieldsets: FieldsetInterface[]) {
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

    const buttonText = computed(() => {
      if (props.isLoading) {
        return "Procesando";
      }

      if (props.form.buttonText) {
        return props.form.buttonText;
      }

      return "Guardar";
    });
    return {
      hasFieldsets,
      onSubmit,
      syncedForm,
      buttonText,
    };
  },
});
</script>
