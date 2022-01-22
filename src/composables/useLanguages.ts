import { useFirebase } from "@/composables/useFirebase";
import LanguageInterface from "@/definitions/entities/LanguageInterface";
import { useUser } from "@/composables/useUser";
import { Ref, ref, computed } from "vue";
import { ref as refDB, set, push, remove } from "firebase/database";
import LanguageClass from "@/models/LanguageModel";

const {
  currentAuthUser,
  database,
  convertObjectsCollectionsToArrayCollections,
} = useFirebase();

const { user } = useUser();

const isFinished: Ref<boolean> = ref(false);
const isLoading: Ref<boolean> = ref(false);

const useLanguages = (): {
  getLanguageById: (id: string) => LanguageInterface;
  isLoading: Ref<boolean>;
  isFinished: Ref<boolean>;
  saveLanguage: (data: LanguageInterface) => Promise<void>;
  deleteLanguage: (id: string) => Promise<void>;
  languages: Ref<LanguageInterface[] | undefined>;
  updateOrderLanguages: (courses: LanguageInterface[]) => Promise<void>;
} => {
  const languages = computed((): LanguageInterface[] | undefined =>
    convertObjectsCollectionsToArrayCollections(user.value?.languages)
      .map((l) => new LanguageClass(l))
      ?.sort((a: LanguageInterface, b: LanguageInterface) =>
        a.order > b.order ? 1 : -1
      )
  );

  function getLanguageById(id: string): LanguageInterface {
    return languages.value?.find((s) => s.id === id) as LanguageInterface;
  }
  async function saveLanguage(data: LanguageInterface): Promise<void> {
    isFinished.value = false;
    isLoading.value = true;

    if (data.id) {
      await set(
        refDB(
          database,
          "users/" + currentAuthUser.value.uid + "/languages/" + data.id
        ),
        data
      );
    } else {
      await push(
        refDB(database, "users/" + currentAuthUser.value.uid + "/languages"),
        data
      );
    }
    isLoading.value = false;
    isFinished.value = true;
  }

  async function deleteLanguage(id: string) {
    isFinished.value = false;
    isLoading.value = true;

    remove(
      refDB(database, "users/" + currentAuthUser.value.uid + "/languages/" + id)
    );

    isLoading.value = false;
    isFinished.value = true;
  }

  async function updateOrderLanguages(
    courses: LanguageInterface[]
  ): Promise<void> {
    isFinished.value = false;
    isLoading.value = true;
    courses.forEach(async (c, index) => {
      await set(
        refDB(
          database,
          "users/" + currentAuthUser.value.uid + "/languages/" + c.id
        ),
        { ...c, order: index }
      );
    });
    isLoading.value = false;
    isFinished.value = true;
  }

  return {
    getLanguageById,
    isLoading,
    isFinished,
    saveLanguage,
    languages,
    deleteLanguage,
    updateOrderLanguages,
  };
};

export default useLanguages;
