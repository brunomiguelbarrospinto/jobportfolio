<template>
  <div>
    <h1>TEST AUTO DEPLOY</h1>
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

<script lang="ts">
import { defineComponent } from "vue";
import useNotifications from "@/composables/useNotifications";
import TransitionComponent from "@/components/transition/Transition.vue";
import Notification from "@/components/common/notification/Notification.vue";

export default defineComponent({
  components: { TransitionComponent, Notification },
  setup() {
    const { notifications, removeNotification } = useNotifications();

    return {
      notifications,
      removeNotification,
    };
  },
});
</script>
