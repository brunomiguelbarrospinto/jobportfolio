<template>
  <router-link
    :to="module.to"
    class="flex flex-col p-3 border bg-white relative"
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
    <Icon :name="module.iconName" class="mb-2 w-8 h-8" />
    <div>{{ module.text }}</div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Icon from "@/components/common/Icon.vue";
import Badge from "@/components/common/Badge.vue";

export default defineComponent({
  components: {
    Icon,
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
