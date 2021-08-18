import { useFirebase } from "@/composables/useFirebase";
import { BannerInterface } from "@/definitions/entities/UserInterface";
import { Ref, ref } from "vue";
const isFinished: Ref<boolean | null> = ref(null);
const isLoading: Ref<boolean | null> = ref(null);

export const useBanner = (): {
  updateBanner: (data: BannerInterface) => Promise<void>;
  isLoading: Ref<boolean | null>;
  isFinished: Ref<boolean | null>;
} => {
  async function updateBanner(data: BannerInterface): Promise<void> {
    const { databaseRefCurrentUser } = useFirebase();
    isFinished.value = null;
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
