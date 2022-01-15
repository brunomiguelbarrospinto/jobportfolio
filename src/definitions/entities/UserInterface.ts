import SocialNetworkInterface from "./SocialNetworksInterface";
import StudyInterface from "./StudyInterface";
import CourseInterface from "./CourseInterface";
import ExperienceInterface from "./ExperienceInterface";
import ProjectInterface from "./ProjectInterface";

export interface AboutMeInterface {
  name: string;
  lastNames?: string;
  dateOfBirth?: string;
  address?: string;
  phone?: string;
  biography?: string;
  photo?: string;
}

export interface BannerInterface {
  backgroundImage: string;
  showPhoto: boolean;
  social: boolean;
  subTitle: string;
  title: string;
}
export interface UserInterface {
  id: string;
  email: string;
  aboutMe?: AboutMeInterface;
  banner?: BannerInterface;
  socialNetworks?: SocialNetworkInterface[];
  studies?: StudyInterface[];
  courses?: CourseInterface[];
  experiences?: ExperienceInterface[];
  projects?: ProjectInterface[];
}
