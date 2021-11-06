import { useFirebase } from "@/composables/useFirebase";
import SocialNetworkInterface from "@/definitions/entities/SocialNetworksInterface";
import { Ref, ref, computed } from "vue";
import { useUser } from "./useUser";

const { databaseRefCurrentUser, convertObjectsCollectionsToArrayCollections } =
  useFirebase();

const isFinished: Ref<boolean> = ref(false);
const isLoading: Ref<boolean> = ref(false);

export const useSocialNetworks = (): {
  saveSocialNetworks: (data: SocialNetworkInterface) => Promise<void>;
  isLoading: Ref<boolean>;
  isFinished: Ref<boolean>;
  socialNetworks: Ref<SocialNetworkInterface[]>;
  getSocialNetworkById: (id: string) => SocialNetworkInterface;
  deleteSocialNetwork: (id: string) => Promise<void>;
  updateOrderSocialNetworks: (
    socialNetworks: SocialNetworkInterface[]
  ) => Promise<void>;
} => {
  async function saveSocialNetworks(
    data: SocialNetworkInterface
  ): Promise<void> {
    isFinished.value = false;
    isLoading.value = true;
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
  const socialNetworks = computed((): SocialNetworkInterface[] =>
    convertObjectsCollectionsToArrayCollections(
      user.value?.socialNetworks
    ).sort((a, b) => (a.order > b.order ? 1 : -1))
  );

  function getSocialNetworkById(id: string): SocialNetworkInterface {
    return socialNetworks.value?.find(
      (sn) => sn.id === id
    ) as SocialNetworkInterface;
  }

  async function deleteSocialNetwork(id: string) {
    isFinished.value = false;
    isLoading.value = true;

    await databaseRefCurrentUser().child("socialNetworks").child(id).remove();

    isLoading.value = false;
    isFinished.value = true;
  }

  async function updateOrderSocialNetworks(
    socialNetworks: SocialNetworkInterface[]
  ): Promise<void> {
    isFinished.value = false;
    isLoading.value = true;

    socialNetworks.forEach((sn, index) => {
      databaseRefCurrentUser()
        .child("socialNetworks")
        .child(sn.id)
        .update({ ...sn, order: index });
    });
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
    updateOrderSocialNetworks,
  };
};
