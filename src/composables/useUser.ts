import { Ref, ref, computed } from "vue";
import UserInterface, {
  AboutMeInterface,
} from "@/definitions/entities/UserInterface";
import { useFirebase } from "./useFirebase";
import { DataSnapshot } from "@firebase/database-types";

const { firebase } = useFirebase();

const user: Ref<UserInterface | null> = ref(null);

export const useUser = (): {
  user: Ref<UserInterface | null>;
  getUserById: (id: string) => void;
  aboutMe: Ref<AboutMeInterface | undefined>;
} => {
  function getUserById(id: string) {
    firebase
      .database()
      .ref("users")
      .child(id)
      .on("value", (snapshot: DataSnapshot) => {
        if (snapshot.val()) {
          user.value = snapshot.val();
        }
      });
  }
  const aboutMe = computed(() => user.value?.aboutMe);
  return {
    user,
    getUserById,
    aboutMe,
  };
};
