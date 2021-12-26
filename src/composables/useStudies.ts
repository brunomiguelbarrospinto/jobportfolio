import { useFirebase } from "@/composables/useFirebase";

import StudyInterface from "@/definitions/entities/StudyInterface";
import { useUser } from "@/composables/useUser";
import { Ref, ref, computed } from "vue";
import { ref as refDB, set, push } from "firebase/database";

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
  studies: Ref<StudyInterface[] | undefined>;
} => {
  const studies = computed((): StudyInterface[] | undefined =>
    convertObjectsCollectionsToArrayCollections(user.value?.studies)
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

  return { getStudyById, isLoading, isFinished, saveStudy, studies };
};
