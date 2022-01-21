<template>
  <Modal :isOpen="isOpen" type="warning">
    <template #title>Desea eliminar la experiencia?</template>
    <template #content>
      Se eliminara el curso permanentemente y no podra recuperar la informacion.
    </template>
    <template #footer>
      <button
        type="button"
        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:ml-3 sm:w-auto sm:text-sm"
        @click="$emit('confirm')"
      >
        Eliminar
      </button>
      <button
        type="button"
        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
