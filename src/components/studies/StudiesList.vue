<template>
  <div class="bg-white border p-4">
    <div class="flex justify-between">
      <div>Mis estudios</div>
      <Button :to="{ name: 'dashboard-studies-create' }">Añadir</Button>
    </div>
  </div>
</template>
<script lang="ts">
// TODO: create list components, create useStudies to get, create, update amd delete studies

import { defineComponent } from "vue";
import Button from "@/components/common/button/Button.vue";
export default defineComponent({
  components: {
    Button,
  },
});
</script>
