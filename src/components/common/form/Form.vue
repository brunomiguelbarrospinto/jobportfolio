<template>
  <form @submit.prevent="onSubmit">
    <template v-if="hasFieldsets">
      <Fieldset
        :key="'fieldset-' + key"
        v-for="(fieldset, key) in form.fieldsets"
        :fieldset="fieldset"
      />
    </template>
    <slot />
    <button :disabled="isLoading" :isLoading="isLoading" type="submit">
      {{ isLoading ? "Procesando" : "Guardar" }}
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
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
  },
  setup(props) {
    const hasFieldsets = computed(() => props.form?.fieldsets !== undefined);
    function onSubmit() {
      let data = {};

      if (hasFieldsets.value) {
        props.form.fieldsets?.forEach((fieldset) => {
          fieldset.elements.forEach((element) => {
            data[element.data.id] =
              element.data.value !== undefined ? element.data.value : null;
          });
        });
      }

      console.log(data);

      //this.$emit('form:onSubmit', data)*/
    }
    return {
      hasFieldsets,
      onSubmit,
    };
  },
});
</script>
