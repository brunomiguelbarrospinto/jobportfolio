export type SocialNetworkType =
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

export const SocialNetworkTypeValues = [
  "behance",
  "facebook",
  "github",
  "gitlab",
  "instagram",
  "linkedin",
  "patreon",
  "pinterest",
  "twitter",
  "youtube",
];

interface SocialNetworkInterface {
  id?: string;
  name: SocialNetworkType;
  link: string;
  order: number;
}

export default SocialNetworkInterface;
