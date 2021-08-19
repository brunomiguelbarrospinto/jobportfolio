import { useFirebase } from "@/composables/useFirebase";
import { AboutMeInterface } from "@/definitions/entities/UserInterface";
import { Ref, ref } from "vue";
const isFinished: Ref<boolean | null> = ref(null);
const isLoading: Ref<boolean | null> = ref(null);

export const useAboutMe = (): {
  updateAboutMe: (data: AboutMeInterface) => Promise<void>;
  isLoading: Ref<boolean | null>;
  isFinished: Ref<boolean | null>;
} => {
  async function updateAboutMe(data: AboutMeInterface): Promise<void> {
    const { databaseRefCurrentUser } = useFirebase();
    isFinished.value = null;
    isLoading.value = true;
    await databaseRefCurrentUser().child("aboutMe").update(data);
    isLoading.value = false;
    isFinished.value = true;
  }

  return {
    updateAboutMe,
    isLoading,
    isFinished,
  };
};
