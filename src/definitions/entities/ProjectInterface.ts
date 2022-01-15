export interface ProjectImageInterface {
  value: string;
  order?: number;
}

export default interface ProjectInterface {
  id?: string;
  name: string;
  url?: string;
  logo?: string;
  description: string;
  order: number;
  images?: ProjectImageInterface[];
}
