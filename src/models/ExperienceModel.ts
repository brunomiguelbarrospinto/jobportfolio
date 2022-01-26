import ExperienceInterface from "@/definitions/entities/ExperienceInterface";
import {
  differenceBetweenTwoDates,
  now,
  getShortMonthName,
  getYear,
} from "@/utils/dayjs";

class LanguageClass {
  id?: string;
  company: string;
  url?: string;
  logo?: string;
  position: string;
  location: string;
  description: string;
  current: boolean;
  startDate: string;
  finishDate: string;
  order: number;
  brandColor?: string;
  startShortMonthName?: string;
  startYear?: number;
  finishShortMonthName?: string;
  finishYear?: number;
  duration?: string;

  constructor(experience: ExperienceInterface) {
    this.id = experience.id;
    this.company = experience.company;
    this.url = experience.url;
    this.logo = experience.logo;
    this.position = experience.position;
    this.location = experience.location;
    this.description = experience.description;
    this.current = experience.current;
    this.startDate = experience.startDate;
    this.finishDate = experience.finishDate;
    this.order = experience.order;
    this.brandColor = experience.brandColor;
    this.startShortMonthName = getShortMonthName(experience.startDate);
    this.startYear = getYear(experience.startDate);
    this.finishShortMonthName = getShortMonthName(
      experience.finishDate as string
    );
    this.finishYear = getYear(experience.finishDate as string);
    this.duration = differenceBetweenTwoDates(
      experience.startDate,
      experience.current ? now() : (experience.finishDate as string)
    );
  }
}

export default LanguageClass;
