import { useFirebase } from "@/composables/useFirebase";
import SocialNetworksInterface from "@/definitions/entities/SocialNetworksInterface";
import { Ref, ref } from "vue";
const isFinished: Ref<boolean | null> = ref(null);
const isLoading: Ref<boolean | null> = ref(null);

export const useSocialNetworks = (): {
  updateSocialNetworks: (data: SocialNetworksInterface) => Promise<void>;
  isLoading: Ref<boolean | null>;
  isFinished: Ref<boolean | null>;
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

  return {
    updateSocialNetworks,
    isLoading,
    isFinished,
  };
};
