<template>
  <div>
    <router-view v-slot="{ Component }">
      <TransitionComponent>
        <component :is="Component" />
      </TransitionComponent>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TransitionComponent from "@/components/transition/Transition.vue";

export default defineComponent({
  components: { TransitionComponent },
});
</script>
