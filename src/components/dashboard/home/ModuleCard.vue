<template>
  <router-link :to="module.to">
    <CardComponent class="relative">
      <div>
        <IconComponent
          :name="module.iconName"
          type="outline"
          class="mb-2 mr-3 h-8 w-8"
        />

        <Badge
          :type="
            module.level === 'low'
              ? 'danger'
              : module.level === 'medium'
              ? 'warning'
              : 'success'
          "
          v-if="module.percent"
        >
          {{ module.percent }}%
        </Badge>
        <Badge
          :type="
            module.level === 'low'
              ? 'danger'
              : module.level === 'medium'
              ? 'warning'
              : 'success'
          "
          v-if="module.count"
        >
          {{ "Total " + module.count }}
        </Badge>
      </div>
      <div>{{ $t(module.text) }}</div>
    </CardComponent>
  </router-link>
</template>

<script lang="ts" setup>
import Badge from "@/components/common/Badge.vue";
import { IconComponent, CardComponent } from "vue-vite-components";
const props = defineProps({
  module: {
    type: Object,
    required: true,
  },
});
</script>
