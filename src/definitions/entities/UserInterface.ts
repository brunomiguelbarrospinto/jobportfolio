import SocialNetworksInterface from "./SocialNetworksInterface";
import StudyInterface from "./StudyInterface";
import CourseInterface from "./CourseInterface";
import ExperienceInterface from "./ExperienceInterface";

export interface AboutMeInterface {
  name: string;
  lastNames: string;
  dateOfBirth: string;
  address: string;
  phone: string;
  biography: string;
  photo: string;
}
export default interface User {
  id: string;
  aboutMe: AboutMeInterface;
  socialNetworks: SocialNetworksInterface;
  studies?: StudyInterface[];
  courses?: CourseInterface[];
  experiences?: ExperienceInterface[];
}
