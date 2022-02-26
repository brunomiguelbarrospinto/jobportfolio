<template>
  <div>
    <Textarea />
    <router-view v-slot="{ Component }">
      <TransitionComponent>
        <component :is="Component" />
      </TransitionComponent>
    </router-view>
    <div class="fixed bottom-0 right-0 m-5">
      <TransitionComponent>
        <Notification
          :key="notification.id"
          v-for="notification in notifications"
          :title="notification.title"
          :description="notification.description"
          :type="notification.type"
          class="mt-5"
          @close="removeNotification(notification.id)"
        />
      </TransitionComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import useNotifications from "@/composables/useNotifications";
import TransitionComponent from "@/components/transition/Transition.vue";
import Notification from "@/components/common/notification/Notification.vue";
const { notifications, removeNotification } = useNotifications();
</script>
