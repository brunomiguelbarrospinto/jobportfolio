import StudyInterface from "@/definitions/entities/StudyInterface";
import {
  differenceBetweenTwoDates,
  now,
  getShortMonthName,
  getYear,
} from "@/utils/dayjs";
class LanguageClass {
  id?: string;
  title: string;
  url?: string;
  institute: string;
  image?: string;
  order: number;
  startDate: string;
  finishDate?: string;
  current?: boolean;
  startShortMonthName?: string;
  startYear?: number;
  finishShortMonthName?: string;
  finishYear?: number;
  duration?: string;

  constructor(study: StudyInterface) {
    this.id = study.id;
    this.title = study.title;
    this.url = study.url;
    this.institute = study.institute;
    this.image = study.image;
    this.order = study.order;
    this.startDate = study.startDate;
    this.finishDate = study.finishDate;
    this.current = study.current;
    this.startShortMonthName = getShortMonthName(study.startDate);
    this.startYear = getYear(study.startDate);
    this.finishShortMonthName = getShortMonthName(study.finishDate as string);
    this.finishYear = getYear(study.finishDate as string);
    this.duration = differenceBetweenTwoDates(
      study.startDate,
      study.current ? now() : (study.finishDate as string)
    );
  }
}

export default LanguageClass;
