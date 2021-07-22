import {
  BannerInterface,
  AboutMeInterface,
} from "./../definitions/entities/UserInterface";
import { computed, Ref } from "vue";
import { useUser } from "./useUser";
const { banner, aboutMe } = useUser();
interface ToInterface {
  name: string;
}

interface ModuleItemInterface {
  text: string;
  to: ToInterface;
  iconName: string;
  percent?: string | number;
  count?: number;
}

export const useModules = (): { modules: Ref<ModuleItemInterface[]> } => {
  const modules = computed((): ModuleItemInterface[] => {
    return [
      {
        text: "Banner",
        to: { name: "banner" },
        iconName: "Newspaper",
        percent:
          (Object.values(banner.value as BannerInterface)
            .map((value) => {
              return value !== "" ? 1 : 0;
            })
            .reduce((a: number, b: number) => a + b, 0) /
            Object.keys(banner.value as BannerInterface).length) *
            100 +
          "%",
      },
      {
        text: "Acerca de mi",
        to: { name: "about-me" },
        iconName: "User",
        percent:
          (Object.values(aboutMe.value as AboutMeInterface)
            .map((value) => {
              return value !== "" ? 1 : 0;
            })
            .reduce((a: number, b: number) => a + b, 0) /
            Object.keys(aboutMe.value as AboutMeInterface).length) *
            100 +
          "%",
      },
      {
        text: "Redes sociales",
        to: { name: "social-networks" },
        iconName: "GlobeAlt",
      },
      {
        text: "Estudios",
        to: { name: "studies" },
        iconName: "AcademicCap",
      },
      {
        text: "Cursos",
        to: { name: "courses" },
        iconName: "BadgeCheck",
      },
      {
        text: "Experiencias",
        to: { name: "experiences" },
        iconName: "Briefcase",
      },
    ];
  });

  return { modules };
};
