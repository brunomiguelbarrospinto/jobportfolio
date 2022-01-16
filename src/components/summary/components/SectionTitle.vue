<template>
  <div class="text-2xl mb-3 font-medium"><slot /></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { UserInterface } from "@/definitions/entities/UserInterface";
export default defineComponent({
  props: {
    user: {
      type: Object as PropType<UserInterface>,
      required: true,
    },
  },
});
</script>
