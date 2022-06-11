<template>
  <div>
    <router-view v-slot="{ Component }">
      <TransitionComponent>
        <component :is="Component" />
      </TransitionComponent>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import TransitionComponent from "@/components/transition/Transition.vue";
</script>
