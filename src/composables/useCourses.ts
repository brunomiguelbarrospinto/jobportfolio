import { useFirebase } from "@/composables/useFirebase";

import CourseInterface from "@/definitions/entities/CourseInterface";
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

export const useCourses = (): {
  getCourseById: (id: string) => CourseInterface;
  isLoading: Ref<boolean>;
  isFinished: Ref<boolean>;
  saveCourse: (data: CourseInterface) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  courses: Ref<CourseInterface[] | undefined>;
  updateOrderCourses: (courses: CourseInterface[]) => Promise<void>;
} => {
  const courses = computed((): CourseInterface[] | undefined =>
    convertObjectsCollectionsToArrayCollections(user.value?.courses)?.sort(
      (a: CourseInterface, b: CourseInterface) => (a.order > b.order ? 1 : -1)
    )
  );

  function getCourseById(id: string): CourseInterface {
    return courses.value?.find((s) => s.id === id) as CourseInterface;
  }
  async function saveCourse(data: CourseInterface): Promise<void> {
    isFinished.value = false;
    isLoading.value = true;
    if (data.id) {
      await set(
        refDB(
          database,
          "users/" + currentAuthUser.value.uid + "/courses/" + data.id
        ),
        data
      );
    } else {
      await push(
        refDB(database, "users/" + currentAuthUser.value.uid + "/courses"),
        data
      );
    }
    isLoading.value = false;
    isFinished.value = true;
  }

  async function deleteCourse(id: string) {
    isFinished.value = false;
    isLoading.value = true;

    remove(
      refDB(database, "users/" + currentAuthUser.value.uid + "/courses/" + id)
    );

    isLoading.value = false;
    isFinished.value = true;
  }

  async function updateOrderCourses(courses: CourseInterface[]): Promise<void> {
    isFinished.value = false;
    isLoading.value = true;
    courses.forEach(async (c, index) => {
      await set(
        refDB(
          database,
          "users/" + currentAuthUser.value.uid + "/courses/" + c.id
        ),
        { ...c, order: index }
      );
    });
    isLoading.value = false;
    isFinished.value = true;
  }

  return {
    getCourseById,
    isLoading,
    isFinished,
    saveCourse,
    courses,
    deleteCourse,
    updateOrderCourses,
  };
};
