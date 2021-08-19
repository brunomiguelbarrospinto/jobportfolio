import { computed, Ref } from "vue";
import { useUser } from "./useUser";
const { banner, aboutMe, studies, courses, experiences } = useUser();
interface ToInterface {
  name: string;
}

type ModuleLevelType = "low" | "medium" | "hight";
interface ModuleItemInterface {
  text: string;
  to: ToInterface;
  iconName: string;
  percent?: string | number;
  count?: number;
  level?: ModuleLevelType;
}

function getPercentOfFillKeysInObject(ob: any) {
  return (
    (Object.values(ob)
      .map((value) => {
        return value !== "" ? 1 : 0;
      })
      .reduce((a: number, b: number) => a + b, 0) /
      Object.keys(ob).length) *
    100
  );
}

export const useModules = (): { modules: Ref<ModuleItemInterface[]> } => {
  const modules = computed((): ModuleItemInterface[] => {
    const percentBanner = getPercentOfFillKeysInObject(banner.value);
    const percentAboutMe = getPercentOfFillKeysInObject(aboutMe.value);
    const countStudies = studies.value?.length || 0;
    const countCourses = courses.value?.length || 0;
    const countExperiences = experiences.value?.length || 0;
    return [
      {
        text: "Banner",
        to: { name: "dashboard-banner" },
        iconName: "Newspaper",
        percent: percentBanner,
        level:
          percentBanner < 50 ? "low" : percentBanner < 75 ? "medium" : "hight",
      },
      {
        text: "Acerca de mi",
        to: { name: "dashboard-about-me" },
        iconName: "User",
        percent: percentAboutMe,
        level:
          percentAboutMe < 50
            ? "low"
            : percentAboutMe < 75
            ? "medium"
            : "hight",
      },
      {
        text: "Redes sociales",
        to: { name: "dashboard-banner" },
        iconName: "GlobeAlt",
      },
      {
        text: "Estudios",
        to: { name: "dashboard-banner" },
        iconName: "AcademicCap",
        count: studies.value?.length,
        level: countStudies < 1 ? "medium" : "hight",
      },
      {
        text: "Cursos",
        to: { name: "dashboard-banner" },
        iconName: "BadgeCheck",
        count: courses.value?.length,
        level: countCourses < 1 ? "medium" : "hight",
      },
      {
        text: "Experiencias",
        to: { name: "dashboard-banner" },
        iconName: "Briefcase",
        count: experiences.value?.length,
        level:
          countExperiences <= 1
            ? "low"
            : countExperiences < 2
            ? "medium"
            : "hight",
      },
    ];
  });

  return { modules };
};
