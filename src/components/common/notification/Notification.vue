<template>
  <div class="w-auto rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <div class="mr-3 w-7">
          <Icon
            v-if="type === 'info'"
            name="InformationCircleIcon"
            class="text-blue-400"
          />
          <Icon
            v-if="type === 'success'"
            name="CheckCircleIcon"
            class="text-green-400"
          />
          <Icon
            v-if="type === 'warning'"
            name="ExclamationCircleIcon"
            class="text-yellow-400"
          />
        </div>
        <div>
          <div class="font-medium text-gray-600">
            {{ title }}
          </div>
        </div>
      </div>
      <div class="ml-3 w-5">
        <Icon
          @click="$emit('close')"
          name="XIcon"
          class="cursor-pointer text-gray-400 hover:text-gray-500"
        />
      </div>
    </div>
    <div class="ml-10 mr-10 text-sm text-gray-400">
      {{ description }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Icon from "@/components/common/Icon.vue";
export default defineComponent({
  components: {
    Icon,
  },
  props: {
    type: {
      type: String,
      default: "info",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
});
</script>
