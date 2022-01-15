

interface ProjectImage{
  id?: string;
  value: string;
  order?: number;
}

interface ProjectVideo{
  id?: string;
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
  images?: ProjectImage[]:
  videos?: ProjectVideo[];
}
