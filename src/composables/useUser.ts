import { Ref, ref } from "vue";
import UserInterface from "@/definitions/entities/userInterface";
import { useFirebase } from "./useFirebase";
import { DataSnapshot } from "@firebase/database-types";

const { firebase } = useFirebase();

const user: Ref<UserInterface | null> = ref(null);

export const useUser = (): {
  user: Ref<UserInterface | null>;
  getUserById: (id: string) => void;
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
  return {
    user,
    getUserById,
  };
};
