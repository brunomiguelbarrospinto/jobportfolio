import { useFirebase } from "@/composables/useFirebase";
import SocialNetworkInterface from "@/definitions/entities/SocialNetworksInterface";
import { Ref, ref, computed } from "vue";
import { useUser } from "./useUser";

const { databaseRefCurrentUser, convertObjectsCollectionsToArrayCollections } =
  useFirebase();

const isFinished: Ref<boolean | null> = ref(null);
const isLoading: Ref<boolean | null> = ref(null);

export const useSocialNetworks = (): {
  saveSocialNetworks: (data: SocialNetworkInterface) => Promise<void>;
  isLoading: Ref<boolean | null>;
  isFinished: Ref<boolean | null>;
  socialNetworks: Ref<SocialNetworkInterface[] | undefined>;
  getSocialNetworkById: (id: string) => SocialNetworkInterface;
  deleteSocialNetwork: (id: string) => Promise<void>;
} => {
  async function saveSocialNetworks(
    data: SocialNetworkInterface
  ): Promise<void> {
    isFinished.value = null;
    isLoading.value = true;
    console.log(data);
    if (data.id) {
      await databaseRefCurrentUser()
        .child("socialNetworks")
        .child(data.id)
        .update(data);
    } else {
      await databaseRefCurrentUser().child("socialNetworks").push(data);
    }
    isLoading.value = false;
    isFinished.value = true;
  }

  const { user } = useUser();
  const socialNetworks = computed((): SocialNetworkInterface[] | undefined =>
    convertObjectsCollectionsToArrayCollections(user.value?.socialNetworks)
  );

  function getSocialNetworkById(id: string): SocialNetworkInterface {
    return socialNetworks.value?.find(
      (sn) => sn.id === id
    ) as SocialNetworkInterface;
  }

  async function deleteSocialNetwork(id: string) {
    isFinished.value = null;
    isLoading.value = true;

    await databaseRefCurrentUser().child("socialNetworks").child(id).remove();

    isLoading.value = false;
    isFinished.value = true;
  }

  return {
    socialNetworks,
    saveSocialNetworks,
    isLoading,
    isFinished,
    getSocialNetworkById,
    deleteSocialNetwork,
  };
};
