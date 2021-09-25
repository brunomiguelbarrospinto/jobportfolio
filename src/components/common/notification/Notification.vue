<template>
  <div class="w-80 bg-white border border-gray-200 p-4 rounded-lg shadow-lg">
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <div class="w-7 mr-3">
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
      <div class="w-5 ml-3">
        <Icon
          @click="$emit('close')"
          name="XIcon"
          class="text-gray-400 cursor-pointer hover:text-gray-500"
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
