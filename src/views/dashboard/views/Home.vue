<template>
  <div class="py-4">
    <Banner class="mb-4" />
    <div class="grid grid-cols-3 gap-4">
      <ModuleCard
        :key="module.text"
        v-for="module in modules"
        :module="module"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Banner from "@/components/Banner.vue";
import ModuleCard from "@/components/dashboard/home/ModuleCard.vue";
import { useModules } from "@/composables/useModules";
export default defineComponent({
  components: {
    Banner,
    ModuleCard,
  },
  setup() {
    const { modules } = useModules();
    return { modules };
  },
});
</script>
