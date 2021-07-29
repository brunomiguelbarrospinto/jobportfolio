<template>
  <div class="bg-white border p-4">
    <Form :form="form" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Form from "@/components/common/form/Form.vue";
import BannerForm from "@/config/BannerForm";
export default defineComponent({
  components: {
    Form,
  },
  setup() {
    return {
      form: BannerForm(),
    };
  },
});
</script>
