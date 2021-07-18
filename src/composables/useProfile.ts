import { Ref, ref } from "vue";
import UserInterface from "@/definitions/entities/userInterface";
import { useFirebase } from "./useFirebase";
import { DataSnapshot } from "@firebase/database-types";

const { firebase } = useFirebase();

const profile: Ref<UserInterface | null> = ref(null);

export const useProfile = (): {
  profile: Ref<UserInterface | null>;
  getProfileByEmail: (email: string) => void;
} => {
  function getProfileByEmail(email: string) {
    firebase
      .database()
      .ref("users")
      .orderByChild("email")
      .equalTo(email)
      .on("value", (snapshot: DataSnapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          profile.value = data[Object.keys(data)[0]];
        }
      });
  }
  return {
    profile,
    getProfileByEmail,
  };
};
