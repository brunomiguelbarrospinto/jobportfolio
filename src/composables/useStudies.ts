import { Ref, computed, ref } from "vue";
import { push, ref as refDB, remove, set } from "firebase/database";

import StudyClass from "@/models/StudyModel";
import StudyInterface from "@/definitions/entities/StudyInterface";
import { useFirebase } from "@/composables/useFirebase";
import { useUser } from "@/composables/useUser";

const {
  currentAuthUser,
  database,
  convertObjectsCollectionsToArrayCollections,
} = useFirebase();

const { user } = useUser();

const isFinished: Ref<boolean> = ref(false);
const isLoading: Ref<boolean> = ref(false);

export const useStudies = (): {
  getStudyById: (id: string) => StudyInterface;
  isLoading: Ref<boolean>;
  isFinished: Ref<boolean>;
  saveStudy: (data: StudyInterface) => Promise<void>;
  deleteStudy: (id: string) => Promise<void>;
  studies: Ref<StudyClass[] | undefined>;
  updateOrderStudies: (studies: StudyInterface[]) => Promise<void>;
} => {
  const studies = computed((): StudyClass[] | undefined =>
    user.value?.studies
      ? convertObjectsCollectionsToArrayCollections(user.value?.studies)
          .map((s) => new StudyClass(s))
          ?.sort((a: StudyClass, b: StudyClass) => (a.order > b.order ? 1 : -1))
      : null
  );

  function getStudyById(id: string): StudyInterface {
    return studies.value?.find((s) => s.id === id) as StudyInterface;
  }
  async function saveStudy(data: StudyInterface): Promise<void> {
    isFinished.value = false;
    isLoading.value = true;
    if (data.id) {
      await set(
        refDB(
          database,
          "users/" + currentAuthUser.value.uid + "/studies/" + data.id
        ),
        data
      );
    } else {
      await push(
        refDB(database, "users/" + currentAuthUser.value.uid + "/studies"),
        data
      );
    }
    isLoading.value = false;
    isFinished.value = true;
  }

  async function deleteStudy(id: string) {
    isFinished.value = false;
    isLoading.value = true;

    remove(
      refDB(database, "users/" + currentAuthUser.value.uid + "/studies/" + id)
    );

    isLoading.value = false;
    isFinished.value = true;
  }

  async function updateOrderStudies(studies: StudyInterface[]): Promise<void> {
    isFinished.value = false;
    isLoading.value = true;
    studies.forEach(async (s, index) => {
      await set(
        refDB(
          database,
          "users/" + currentAuthUser.value.uid + "/studies/" + s.id
        ),
        { ...s, order: index }
      );
    });
    isLoading.value = false;
    isFinished.value = true;
  }

  return {
    getStudyById,
    isLoading,
    isFinished,
    saveStudy,
    studies,
    deleteStudy,
    updateOrderStudies,
  };
};
