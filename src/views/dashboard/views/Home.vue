<template>
  <div>
    <div class="grid grid-cols-2 gap-5 pb-5 md:grid-cols-3">
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
import { useModules } from "@/composables/useModules";
const { modules } = useModules();
</script>
