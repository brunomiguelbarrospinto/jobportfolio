export default interface StudyInterface {
  id?: string;
  title: string;
  url?: string;
  institute: string;
  image?: string;
  order: number;
  startDate: string;
  finishDate?: string;
  current?: boolean;
}
