import { useFirebase } from "@/composables/useFirebase";
import KnowledgeInterface from "@/definitions/entities/KnowledgeInterface";
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

const useKnowledge = (): {
  getKnowledgeById: (id: string) => KnowledgeInterface;
  isLoading: Ref<boolean>;
  isFinished: Ref<boolean>;
  saveKnowledge: (data: KnowledgeInterface) => Promise<void>;
  deleteKnowledge: (id: string) => Promise<void>;
  knowledge: Ref<KnowledgeInterface[] | undefined>;
  updateOrderKnowledge: (courses: KnowledgeInterface[]) => Promise<void>;
} => {
  const knowledge = computed((): KnowledgeInterface[] | undefined =>
    convertObjectsCollectionsToArrayCollections(user.value?.knowledge)?.sort(
      (a: KnowledgeInterface, b: KnowledgeInterface) =>
        a.order > b.order ? 1 : -1
    )
  );

  function getKnowledgeById(id: string): KnowledgeInterface {
    return knowledge.value?.find((s) => s.id === id) as KnowledgeInterface;
  }
  async function saveKnowledge(data: KnowledgeInterface): Promise<void> {
    isFinished.value = false;
    isLoading.value = true;

    if (data.id) {
      await set(
        refDB(
          database,
          "users/" + currentAuthUser.value.uid + "/knowledge/" + data.id
        ),
        data
      );
    } else {
      await push(
        refDB(database, "users/" + currentAuthUser.value.uid + "/knowledge"),
        data
      );
    }
    isLoading.value = false;
    isFinished.value = true;
  }

  async function deleteKnowledge(id: string) {
    isFinished.value = false;
    isLoading.value = true;

    remove(
      refDB(database, "users/" + currentAuthUser.value.uid + "/knowledge/" + id)
    );

    isLoading.value = false;
    isFinished.value = true;
  }

  async function updateOrderKnowledge(
    courses: KnowledgeInterface[]
  ): Promise<void> {
    isFinished.value = false;
    isLoading.value = true;
    courses.forEach(async (c, index) => {
      await set(
        refDB(
          database,
          "users/" + currentAuthUser.value.uid + "/knowledge/" + c.id
        ),
        { ...c, order: index }
      );
    });
    isLoading.value = false;
    isFinished.value = true;
  }

  return {
    getKnowledgeById,
    isLoading,
    isFinished,
    saveKnowledge,
    knowledge,
    deleteKnowledge,
    updateOrderKnowledge,
  };
};

export default useKnowledge;
