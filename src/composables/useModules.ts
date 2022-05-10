import { computed, Ref } from "vue";
import { useUser } from "./useUser";
import { useSocialNetworks } from "./useSocialNetworks";
import { useStudies } from "./useStudies";
import { useCourses } from "./useCourses";
import useExperiences from "./useExperiences";
import useProjects from "./useProjects";
import useKnowledge from "./useKnowledge";
import useLanguages from "./useLanguages";

import { BannerInterface } from "@/definitions/entities/UserInterface";
import { AboutMeInterface } from "@/definitions/entities/UserInterface";
const { banner, aboutMe } = useUser();
const { studies } = useStudies();
const { socialNetworks } = useSocialNetworks();
const { courses } = useCourses();
const { experiences } = useExperiences();
const { projects } = useProjects();
const { knowledge } = useKnowledge();
const { languages } = useLanguages();
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
    const countSocialNetworks = socialNetworks.value?.length || 0;
    const countStudies = studies.value?.length || 0;
    const countCourses = courses.value?.length || 0;
    const countExperiences = experiences.value?.length || 0;
    const countProjects = projects.value?.length || 0;
    const countKnowledge = knowledge.value?.length || 0;
    const countLanguages = languages.value?.length || 0;
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
        text: "About me",
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
        text: "Social media",
        to: { name: "dashboard-social-networks-list" },
        iconName: "GlobeAltIcon",
        count: countSocialNetworks,
        level: countSocialNetworks < 1 ? "medium" : "hight",
      },
      {
        text: "Languages",
        to: { name: "dashboard-languages-list" },
        iconName: "TranslateIcon",
        count: countLanguages,
        level: countLanguages < 1 ? "medium" : "hight",
      },
      {
        text: "Studies",
        to: { name: "dashboard-studies-list" },
        iconName: "AcademicCapIcon",
        count: countStudies,
        level: countStudies < 1 ? "medium" : "hight",
      },
      {
        text: "Courses",
        to: { name: "dashboard-courses-list" },
        iconName: "BadgeCheckIcon",
        count: countCourses,
        level: countCourses < 1 ? "medium" : "hight",
      },
      {
        text: "Knowledge",
        to: { name: "dashboard-knowledge-list" },
        iconName: "LightBulbIcon",
        count: countKnowledge,
        level: countKnowledge < 5 ? "medium" : "hight",
      },
      {
        text: "Experiences",
        to: { name: "dashboard-experiences-list" },
        iconName: "BriefcaseIcon",
        count: countExperiences,
        level:
          countExperiences <= 1
            ? "low"
            : countExperiences < 2
            ? "medium"
            : "hight",
      },
      {
        text: "Projects",
        to: { name: "dashboard-projects-list" },
        iconName: "BeakerIcon",
        count: countProjects,
        level:
          countProjects <= 1 ? "low" : countProjects < 2 ? "medium" : "hight",
      },
    ];
  });

  return { modules };
};
