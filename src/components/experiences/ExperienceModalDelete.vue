<template>
  <Modal :isOpen="isOpen" type="warning">
    <template #title>Desea eliminar la experiencia?</template>
    <template #content>
      Se eliminara el curso permanentemente y no podra recuperar la informacion.
    </template>
    <template #footer>
      <button
        type="button"
        class="inline-flex w-full justify-center rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
        @click="$emit('confirm')"
      >
        Eliminar
      </button>
      <button
        type="button"
        class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        @click="$emit('close')"
      >
        Cancelar
      </button>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Modal from "@/components/common/modal/Modal.vue";

export default defineComponent({
  components: {
    Modal,
  },
  props: {
    isOpen: {
      type: Boolean,
    },
  },
});
</script>
