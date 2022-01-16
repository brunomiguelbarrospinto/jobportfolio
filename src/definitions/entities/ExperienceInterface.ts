export default interface ExperienceInterface {
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
}
