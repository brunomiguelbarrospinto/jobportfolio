import SocialNetworkInterface from "./SocialNetworksInterface";
import StudyInterface from "./StudyInterface";
import CourseInterface from "./CourseInterface";
import ExperienceInterface from "./ExperienceInterface";

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
export default interface User {
  id: string;
  aboutMe?: AboutMeInterface;
  banner?: BannerInterface;
  socialNetworks?: SocialNetworkInterface[];
  studies?: StudyInterface[];
  courses?: CourseInterface[];
  experiences?: ExperienceInterface[];
}
