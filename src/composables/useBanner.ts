import { useFirebase } from "@/composables/useFirebase";
import { BannerInterface } from "@/definitions/entities/UserInterface";
import { Ref, ref } from "vue";
const isFinished: Ref<boolean> = ref(false);
const isLoading: Ref<boolean> = ref(false);

export const useBanner = (): {
  updateBanner: (data: BannerInterface) => Promise<void>;
  isLoading: Ref<boolean>;
  isFinished: Ref<boolean>;
} => {
  async function updateBanner(data: BannerInterface): Promise<void> {
    const { databaseRefCurrentUser } = useFirebase();
    isFinished.value = false;
    isLoading.value = true;
    await databaseRefCurrentUser().child("banner").update(data);
    isLoading.value = false;
    isFinished.value = true;
  }

  return {
    updateBanner,
    isLoading,
    isFinished,
  };
};
