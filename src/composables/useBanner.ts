import { useFirebase } from "@/composables/useFirebase";
import { BannerInterface } from "@/definitions/entities/UserInterface";
import { Ref, ref } from "vue";
import { ref as refDB, set } from "firebase/database";

const isFinished: Ref<boolean> = ref(false);
const isLoading: Ref<boolean> = ref(false);

export const useBanner = (): {
  updateBanner: (data: BannerInterface) => Promise<void>;
  isLoading: Ref<boolean>;
  isFinished: Ref<boolean>;
} => {
  async function updateBanner(data: BannerInterface): Promise<void> {
    const { currentAuthUser, database } = useFirebase();
    isFinished.value = false;
    isLoading.value = true;
    console.log(data);
    set(
      refDB(database, "users/" + currentAuthUser.value.uid + "/banner"),
      data
    );
    isLoading.value = false;
    isFinished.value = true;
  }

  return {
    updateBanner,
    isLoading,
    isFinished,
  };
};
