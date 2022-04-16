<template>
  <router-link
    :to="module.to"
    class="relative flex flex-col border bg-white p-3"
  >
    <span class="absolute -top-3 -right-2">
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
    </span>
    <IconComponent :name="module.iconName" class="mb-2 h-8 w-8" />
    <div>{{ module.text }}</div>
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

<style></style>
