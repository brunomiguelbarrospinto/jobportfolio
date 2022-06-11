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
<script lang="ts" setup>
import ModuleCard from "@/components/dashboard/home/ModuleCard.vue";
import { useUser } from "@/composables/useUser";

import { useModules } from "@/composables/useModules";

const { user } = useUser();
const { modules } = useModules();
</script>
