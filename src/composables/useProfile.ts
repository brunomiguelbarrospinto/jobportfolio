import { Ref, ref } from "vue";
import { UserInterface } from "@/definitions/entities/UserInterface";
import { useFirebase } from "./useFirebase";
import { ref as refDB, onValue } from "firebase/database";

const { database, convertObjectsCollectionsToArrayCollections } = useFirebase();

const profile: Ref<UserInterface | null> = ref(null);

export const useProfile = (): {
  profile: Ref<UserInterface | null>;
  getProfileByEmail: (email: string) => void;
} => {
  function getProfileByEmail(email: string) {
    const userDB = refDB(database, `users`);
    onValue(
      userDB,
      (snapshot) => {
        const users = convertObjectsCollectionsToArrayCollections(
          snapshot.val()
        );
        profile.value = users.find((u: UserInterface) => u.email === email);
      },
      {
        onlyOnce: true,
      }
    );
  }
  return {
    profile,
    getProfileByEmail,
  };
};
