type SocialNetworkType =
  | "behance"
  | "facebook"
  | "github"
  | "gitlab"
  | "instagram"
  | "linkedin"
  | "patreon"
  | "pinterest"
  | "twitter"
  | "youtube";

interface SocialNetworkInterface {
  social: SocialNetworkType;
  link: string;
  order: number;
}

export default interface SocialNetworksInterface {}
