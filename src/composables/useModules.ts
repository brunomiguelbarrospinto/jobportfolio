import { computed, Ref } from "vue";
import { useUser } from "./useUser";
import { useStudies } from "./useStudies";
import { useCourses } from "./useCourses";
import { useExperiences } from "./useExperiences";

import { BannerInterface } from "@/definitions/entities/UserInterface";
import { AboutMeInterface } from "@/definitions/entities/UserInterface";
const { banner, aboutMe } = useUser();
const { studies } = useStudies();
const { courses } = useCourses();
const { experiences } = useExperiences();
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

function getPercentOfFillKeysInObject(ob: BannerInterface | AboutMeInterface) {
  if (!ob) {
    return 0;
  }
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
    // const countExperiences = experiences.value?.length || 0;
    return [
      {
        text: "Banner",
        to: { name: "dashboard-banner" },
        iconName: "NewspaperIcon",
        percent: percentBanner,
        level:
          percentBanner < 50 ? "low" : percentBanner < 75 ? "medium" : "hight",
      },
      {
        text: "Acerca de mi",
        to: { name: "dashboard-about-me" },
        iconName: "UserIcon",
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
        to: { name: "dashboard-social-networks-list" },
        iconName: "GlobeAltIcon",
      },
      {
        text: "Estudios",
        to: { name: "dashboard-studies-list" },
        iconName: "AcademicCapIcon",
        count: studies.value?.length,
        level: countStudies < 1 ? "medium" : "hight",
      },
      {
        text: "Cursos",
        to: { name: "dashboard-courses-list" },
        iconName: "BadgeCheckIcon",
        count: courses.value?.length,
        level: countCourses < 1 ? "medium" : "hight",
      },
      // {
      //   text: "Experiencias",
      //   to: { name: "dashboard-banner" },
      //   iconName: "BriefcaseIcon",
      //   count: experiences.value?.length,
      //   level:
      //     countExperiences <= 1
      //       ? "low"
      //       : countExperiences < 2
      //       ? "medium"
      //       : "hight",
      // },
    ];
  });

  return { modules };
};
