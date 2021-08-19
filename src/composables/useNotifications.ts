import { ref, Ref } from "vue";

interface Notification {
  id: string | number;
  type: string;
  title: string;
  description: string;
}
const notifications: Ref<Notification[]> = ref([]);

export default function useNotificationsStore(): {
  notifications: Ref<Notification[]>;
  pushNotification: (notification: Notification) => void;
  removeNotification: (id: string | number) => void;
} {
  function pushNotification(notification: Notification) {
    notification.id = new Date().getTime();
    notifications.value.push(notification);
    setTimeout(() => {
      removeNotification(notification.id);
    }, 5000);
  }
  function removeNotification(id: string | number) {
    notifications.value = notifications.value.filter((n) => n.id !== id);
  }

  return {
    notifications,
    pushNotification,
    removeNotification,
  };
}
