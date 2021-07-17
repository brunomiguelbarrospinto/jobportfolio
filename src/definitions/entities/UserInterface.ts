import SocialNetworksInterface from "./SocialNetworksInterface";
import StudyInterface from "./StudyInterface";
import CourseInterface from "./CourseInterface";
import ExperienceInterface from "./ExperienceInterface";

export default interface User {
  id: string;
  name: string;
  lastNames: string;
  dateOfBirth: string;
  address: string;
  phone: string;
  biography: string;
  photo: string;
  socialNetworks: SocialNetworksInterface;
  studies?: StudyInterface[];
  courses?: CourseInterface[];
  experiences?: ExperienceInterface[];
}
