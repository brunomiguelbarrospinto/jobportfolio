<template>
  <Modal :isOpen="isOpen" type="warning">
    <template #title>Desea eliminar la experiencia?</template>
    <template #content>
      Se eliminara el curso permanentemente y no podra recuperar la informacion.
    </template>
    <template #footer>
      <ButtonComponent size="sm" text="Eliminar" @click="$emit('confirm')" />
      <ButtonComponent
        size="sm"
        isOutline
        text="Cancelar"
        @click="$emit('close')"
      />
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import Modal from "@/components/common/modal/Modal.vue";
import { ButtonComponent } from "vue-vite-components";
defineProps({
  isOpen: {
    type: Boolean,
  },
});
</script>
