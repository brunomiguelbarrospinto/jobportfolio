import { useFirebase } from "@/composables/useFirebase";
import SocialNetworksInterface from "@/definitions/entities/SocialNetworksInterface";
import { Ref, ref, computed } from "vue";
import { useUser } from "./useUser";

const isFinished: Ref<boolean | null> = ref(null);
const isLoading: Ref<boolean | null> = ref(null);

export const useSocialNetworks = (): {
  updateSocialNetworks: (data: SocialNetworksInterface) => Promise<void>;
  isLoading: Ref<boolean | null>;
  isFinished: Ref<boolean | null>;
  socialNetworks: Ref<SocialNetworksInterface | undefined>;
} => {
  async function updateSocialNetworks(
    data: SocialNetworksInterface
  ): Promise<void> {
    const { databaseRefCurrentUser } = useFirebase();
    isFinished.value = null;
    isLoading.value = true;
    await databaseRefCurrentUser().child("socialNetworks").update(data);
    isLoading.value = false;
    isFinished.value = true;
  }

  const { user } = useUser();
  const socialNetworks = computed(
    (): SocialNetworksInterface | undefined => user.value?.socialNetworks
  );

  return {
    updateSocialNetworks,
    isLoading,
    isFinished,
    socialNetworks,
  };
};
