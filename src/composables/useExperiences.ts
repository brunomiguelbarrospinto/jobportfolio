import { useFirebase } from "@/composables/useFirebase";

import ExperienceInterface from "@/definitions/entities/ExperienceInterface";
import { useUser } from "@/composables/useUser";
import { Ref, ref, computed } from "vue";
import { ref as refDB, set, push, remove } from "firebase/database";

const {
  currentAuthUser,
  database,
  convertObjectsCollectionsToArrayCollections,
} = useFirebase();

const { user } = useUser();

const isFinished: Ref<boolean> = ref(false);
const isLoading: Ref<boolean> = ref(false);

export const useExperiences = (): {
  getExperienceById: (id: string) => CourseInExperienceInterfaceterface;
  isLoading: Ref<boolean>;
  isFinished: Ref<boolean>;
  saveExperience: (data: ExperienceInterface) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  experiences: Ref<ExperienceInterface[] | undefined>;
  updateOrderExperiences: (courses: ExperienceInterface[]) => Promise<void>;
} => {
  const experiences = computed((): ExperienceInterface[] | undefined =>
    convertObjectsCollectionsToArrayCollections(user.value?.courses)?.sort(
      (a: ExperienceInterface, b: ExperienceInterface) =>
        a.order > b.order ? 1 : -1
    )
  );

  function getExperienceById(id: string): ExperienceInterface {
    return experiences.value?.find((s) => s.id === id) as ExperienceInterface;
  }
  async function saveExperience(data: ExperienceInterface): Promise<void> {
    isFinished.value = false;
    isLoading.value = true;
    if (data.id) {
      await set(
        refDB(
          database,
          "users/" + currentAuthUser.value.uid + "/experiences/" + data.id
        ),
        data
      );
    } else {
      await push(
        refDB(database, "users/" + currentAuthUser.value.uid + "/experiences"),
        data
      );
    }
    isLoading.value = false;
    isFinished.value = true;
  }

  async function deleteExperience(id: string) {
    isFinished.value = false;
    isLoading.value = true;

    remove(
      refDB(
        database,
        "users/" + currentAuthUser.value.uid + "/experience/" + id
      )
    );

    isLoading.value = false;
    isFinished.value = true;
  }

  async function updateOrderExperiences(
    courses: ExperienceInterface[]
  ): Promise<void> {
    isFinished.value = false;
    isLoading.value = true;
    courses.forEach(async (c, index) => {
      await set(
        refDB(
          database,
          "users/" + currentAuthUser.value.uid + "/experiences/" + c.id
        ),
        { ...c, order: index }
      );
    });
    isLoading.value = false;
    isFinished.value = true;
  }

  return {
    getExperienceById,
    isLoading,
    isFinished,
    saveExperience,
    experiences,
    deleteExperience,
    updateOrderExperiences,
  };
};
