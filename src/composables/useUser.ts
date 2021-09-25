import SocialNetworksInterface from "@/definitions/entities/SocialNetworksInterface";
import { Ref, ref, computed } from "vue";
import UserInterface, {
  AboutMeInterface,
  BannerInterface,
} from "@/definitions/entities/UserInterface";
import { useFirebase } from "./useFirebase";
import { DataSnapshot } from "@firebase/database-types";
import StudyInterface from "@/definitions/entities/StudyInterface";
import CourseInterface from "@/definitions/entities/CourseInterface";
import ExperienceInterface from "@/definitions/entities/ExperienceInterface";

const { firebase, convertObjectsCollectionsToArrayCollections } = useFirebase();

const user: Ref<UserInterface | null> = ref(null);

export const useUser = (): {
  user: Ref<UserInterface | null>;
  getUserById: (id: string) => void;
  aboutMe: Ref<AboutMeInterface | undefined>;
  socialNetworks: Ref<SocialNetworksInterface | undefined>;

  banner: Ref<BannerInterface | undefined>;
  studies: Ref<StudyInterface[] | undefined>;
  courses: Ref<CourseInterface[] | undefined>;
  experiences: Ref<ExperienceInterface[] | undefined>;
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
  const banner = computed(() => user.value?.banner);
  const socialNetworks = computed(
    (): SocialNetworksInterface | undefined => user.value?.socialNetworks
  );
  const studies = computed((): StudyInterface[] | undefined =>
    convertObjectsCollectionsToArrayCollections(user.value?.studies)
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
    aboutMe,
    socialNetworks,
    banner,
    studies,
    courses,
    experiences,
  };
};
