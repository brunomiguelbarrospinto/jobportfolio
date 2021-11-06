import { useFirebase } from "@/composables/useFirebase";
import { AboutMeInterface } from "@/definitions/entities/UserInterface";
import { Ref, ref } from "vue";
const isFinished: Ref<boolean> = ref(false);
const isLoading: Ref<boolean> = ref(false);

export const useAboutMe = (): {
  updateAboutMe: (data: AboutMeInterface) => Promise<void>;
  isLoading: Ref<boolean>;
  isFinished: Ref<boolean>;
} => {
  async function updateAboutMe(data: AboutMeInterface): Promise<void> {
    const { databaseRefCurrentUser } = useFirebase();
    isFinished.value = false;
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
