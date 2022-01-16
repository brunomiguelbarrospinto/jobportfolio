<template>
  <div class="pb-5">
    <Banner :user="user" class="mb-5" />
    <div class="grid grid-cols-3 gap-5">
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
import { useUser } from "@/composables/useUser";

import { useModules } from "@/composables/useModules";
export default defineComponent({
  components: {
    Banner,
    ModuleCard,
  },
  setup() {
    const { user } = useUser();
    const { modules } = useModules();
    return { user, modules };
  },
});
</script>
