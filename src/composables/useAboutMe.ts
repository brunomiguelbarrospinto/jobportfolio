import { useFirebase } from "@/composables/useFirebase";
import { useUser } from "@/composables/useUser";
import { AboutMeInterface } from "@/definitions/entities/UserInterface";
import { Ref, ref } from "vue";
import { ref as refDB, set } from "firebase/database";

const isFinished: Ref<boolean> = ref(false);
const isLoading: Ref<boolean> = ref(false);

export const useAboutMe = (): {
  aboutMe: Ref<AboutMeInterface | undefined>;
  updateAboutMe: (data: AboutMeInterface) => Promise<void>;
  isLoading: Ref<boolean>;
  isFinished: Ref<boolean>;
} => {
  const { user } = useUser();

  const aboutMe = ref<AboutMeInterface | undefined>(user?.value?.aboutMe);

  async function updateAboutMe(data: AboutMeInterface): Promise<void> {
    const { currentAuthUser, database } = useFirebase();
    isFinished.value = false;
    isLoading.value = true;
    set(
      refDB(database, "users/" + currentAuthUser.value.uid + "/aboutMe"),
      data
    );
    isLoading.value = false;
    isFinished.value = true;
  }

  return {
    aboutMe,
    updateAboutMe,
    isLoading,
    isFinished,
  };
};
