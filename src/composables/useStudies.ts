import StudyInterface from "@/definitions/entities/StudyInterface";
import { useUser } from "@/composables/useUser";
const { studies } = useUser();
export const useStudies = (): {
  getStudyById: (id: string) => StudyInterface;
} => {
  function getStudyById(id: string): StudyInterface {
    return studies.value?.find((s) => s.id === id) as StudyInterface;
  }

  return { getStudyById };
};
