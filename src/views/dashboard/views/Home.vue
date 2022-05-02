<template>
  <div>
    <div class="grid grid-cols-3 gap-5 pb-5">
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
import ModuleCard from "@/components/dashboard/home/ModuleCard.vue";
import { useUser } from "@/composables/useUser";

import { useModules } from "@/composables/useModules";
export default defineComponent({
  components: {
    ModuleCard,
  },
  setup() {
    const { user } = useUser();
    const { modules } = useModules();
    return { user, modules };
  },
});
</script>
