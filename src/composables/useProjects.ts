import { useFirebase } from "@/composables/useFirebase";
import ProjectInterface from "@/definitions/entities/ProjectInterface";
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

const useProjects = (): {
  getProjectById: (id: string) => ProjectInterface;
  isLoading: Ref<boolean>;
  isFinished: Ref<boolean>;
  saveProject: (data: ProjectInterface) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  projects: Ref<ProjectInterface[] | undefined>;
  updateOrderProjects: (projects: ProjectInterface[]) => Promise<void>;
} => {
  const projects = computed((): ProjectInterface[] | undefined =>
    convertObjectsCollectionsToArrayCollections(user.value?.projects)?.sort(
      (a: ProjectInterface, b: ProjectInterface) => (a.order > b.order ? 1 : -1)
    )
  );

  function getProjectById(id: string): ProjectInterface {
    return projects.value?.find((s) => s.id === id) as ProjectInterface;
  }
  async function saveProject(data: ProjectInterface): Promise<void> {
    isFinished.value = false;
    isLoading.value = true;

    if (data.id) {
      await set(
        refDB(
          database,
          "users/" + currentAuthUser.value.uid + "/projects/" + data.id
        ),
        data
      );
    } else {
      await push(
        refDB(database, "users/" + currentAuthUser.value.uid + "/projects"),
        data
      );
    }
    isLoading.value = false;
    isFinished.value = true;
  }

  async function deleteProject(id: string) {
    isFinished.value = false;
    isLoading.value = true;

    remove(
      refDB(database, "users/" + currentAuthUser.value.uid + "/projects/" + id)
    );

    isLoading.value = false;
    isFinished.value = true;
  }

  async function updateOrderProjects(
    courses: ProjectInterface[]
  ): Promise<void> {
    isFinished.value = false;
    isLoading.value = true;
    courses.forEach(async (c, index) => {
      await set(
        refDB(
          database,
          "users/" + currentAuthUser.value.uid + "/projects/" + c.id
        ),
        { ...c, order: index }
      );
    });
    isLoading.value = false;
    isFinished.value = true;
  }

  return {
    getProjectById,
    isLoading,
    isFinished,
    saveProject,
    projects,
    deleteProject,
    updateOrderProjects,
  };
};

export default useProjects;
