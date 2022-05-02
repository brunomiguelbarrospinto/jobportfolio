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
      <div>{{ module.text }}</div>
    </CardComponent>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Badge from "@/components/common/Badge.vue";

export default defineComponent({
  components: {
    Badge,
  },
  props: {
    module: {
      type: Object,
      required: true,
    },
  },
});
</script>
