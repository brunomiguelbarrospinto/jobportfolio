import { ref as refDB, onValue, set, get, child } from "firebase/database";

import { Ref, ref, computed } from "vue";
import {
  UserInterface,
  AboutMeInterface,
  BannerInterface,
} from "@/definitions/entities/UserInterface";
import { useFirebase } from "./useFirebase";
import CourseInterface from "@/definitions/entities/CourseInterface";
import ExperienceInterface from "@/definitions/entities/ExperienceInterface";

const { database, convertObjectsCollectionsToArrayCollections } = useFirebase();

const user: Ref<UserInterface | null> = ref(null);

export const useUser = (): {
  user: Ref<UserInterface | null>;
  getUserById: (id: string) => void;
  setBaseUser: (id: string) => void;
  aboutMe: Ref<AboutMeInterface>;
  banner: Ref<BannerInterface>;
  courses: Ref<CourseInterface[] | undefined>;
  experiences: Ref<ExperienceInterface[] | undefined>;
} => {
  async function getUserById(id: string) {
    await get(child(refDB(database), "users/" + id))
      .then((snapshot) => {
        if (snapshot.exists()) {
          user.value = snapshot.val();
          onValue(refDB(database, "users/" + id), (snapshot) => {
            user.value = snapshot.val();
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // eslint-disable-next-line
  function setBaseUser(authUser: any) {
    set(refDB(database, "users/" + authUser.uid), {
      id: authUser.uid,
      email: authUser.email,
      aboutMe: {
        photo: authUser.photoURL,
      },
      banner: {
        title: authUser.email,
        subTitle: authUser.email,
      },
    });
  }

  const aboutMe = computed(
    (): AboutMeInterface => user.value?.aboutMe as AboutMeInterface
  );
  const banner = computed(
    (): BannerInterface => user.value?.banner as BannerInterface
  );

  const courses = computed((): CourseInterface[] | undefined =>
    convertObjectsCollectionsToArrayCollections(user.value?.courses)
  );
  const experiences = computed((): ExperienceInterface[] | undefined =>
    convertObjectsCollectionsToArrayCollections(user.value?.experiences)
  );
  return {
    user,
    getUserById,
    setBaseUser,
    aboutMe,
    banner,
    courses,
    experiences,
  };
};
