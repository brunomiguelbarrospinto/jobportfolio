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
      :text="$t(buttonText)"
      color="primary"
      size="sm"
    />
  </form>
</template>

<script lang="ts" setup>
import { PropType, computed } from "vue";
import FieldsetInterface from "@/definitions/form/FieldsetInterface";
import FormInterface from "@/definitions/form/FormInterface";
import Fieldset from "./Fieldset.vue";
import useLocale from "@/composables/useLocale";
import { ButtonComponent } from "vue-vite-components";

const props = defineProps({
  form: {
    type: Object as PropType<FormInterface>,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  values: { type: Object },
});

const emit = defineEmits(["form:onSubmit"]);

const { currentLocale } = useLocale();
const hasFieldsets = computed(() => props.form?.fieldsets !== undefined);
function onSubmit() {
  if (hasFieldsets.value) {
    emit(
      "form:onSubmit",
      formatData(props.form.fieldsets as FieldsetInterface[])
    );
  }
}

function formatData(fieldsets: FieldsetInterface[]) {
  let data = props.values ? JSON.parse(JSON.stringify(props.values)) : {};
  fieldsets?.forEach((fieldset) => {
    fieldset.elements.forEach((element) => {
      if (element.translatable) {
        if (!element.data.value) {
          data[element.data.id] = null;
        } else {
          if (
            !data[element.data.id] ||
            typeof data[element.data.id] === "string"
          ) {
            data[element.data.id] = {};
          }

          data[element.data.id][currentLocale.value] =
            element.data.value !== undefined ? element.data.value : null;
        }
      } else {
        data[element.data.id] =
          element.data.value !== undefined ? element.data.value : null;
      }
    });
  });

  return data;
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
                ? element.translatable
                  ? props.values[element.data.id][currentLocale.value]
                  : props.values[element.data.id]
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
    return "Processing";
  }

  if (props.form.buttonText) {
    return props.form.buttonText;
  }

  return "Save";
});
</script>
