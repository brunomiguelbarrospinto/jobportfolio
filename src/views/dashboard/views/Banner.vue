<template>
  <div class="bg-white border p-4">
    <Form
      :form="form"
      :values="user.banner"
      @form:onSubmit="updateBannerForm"
      :isLoading="isLoading"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Form from "@/components/common/form/Form.vue";
import BannerForm from "@/config/BannerForm";
import { useUser } from "@/composables/useUser";
import { useBanner } from "@/composables/useBanner";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    Form,
  },
  setup() {
    const { user } = useUser();
    const { updateBanner, isLoading, isFinished } = useBanner();
    const router = useRouter();
    async function updateBannerForm(data: any) {
      await updateBanner(data);
      if (isFinished) {
        router.push({ name: "home" });
      }
    }
    return {
      form: BannerForm(),
      user,
      updateBannerForm,
      isLoading,
      isFinished,
    };
  },
});
</script>
