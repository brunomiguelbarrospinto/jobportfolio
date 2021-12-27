import Linkedin from "@/components/common/social/Linkedin.vue";
import Facebook from "@/components/common/social/Facebook.vue";
import Twitter from "@/components/common/social/Twitter.vue";
import Instagram from "@/components/common/social/Instagram.vue";
import Youtube from "@/components/common/social/Youtube.vue";
import Pinterest from "@/components/common/social/Pinterest.vue";
import Patreon from "@/components/common/social/Patreon.vue";
import Github from "@/components/common/social/Github.vue";
import Gitlab from "@/components/common/social/Gitlab.vue";
import Behance from "@/components/common/social/Behance.vue";
import { Component } from "vue";

export function getSocialNetworkIconComponent(
  name: string
): Component | undefined {
  let component;

  if (name === "linkedin") {
    component = Linkedin;
  }
  if (name === "facebook") {
    component = Facebook;
  }
  if (name === "twitter") {
    component = Twitter;
  }
  if (name === "instagram") {
    component = Instagram;
  }
  if (name === "youtube") {
    component = Youtube;
  }
  if (name === "pinterest") {
    component = Pinterest;
  }
  if (name === "patreon") {
    component = Patreon;
  }
  if (name === "github") {
    component = Github;
  }
  if (name === "gitlab") {
    component = Gitlab;
  }
  if (name === "behance") {
    component = Behance;
  }

  return component;
}
