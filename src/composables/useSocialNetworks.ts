import { useFirebase } from "@/composables/useFirebase";
import SocialNetworkInterface from "@/definitions/entities/SocialNetworksInterface";
import { Ref, ref, computed } from "vue";
import { useUser } from "./useUser";
import { ref as refDB, set, remove, push } from "firebase/database";
const { user } = useUser();

const {
  currentAuthUser,
  database,
  convertObjectsCollectionsToArrayCollections,
} = useFirebase();

const isFinished: Ref<boolean> = ref(false);
const isLoading: Ref<boolean> = ref(false);

export const useSocialNetworks = (): {
  socialNetworks: Ref<SocialNetworkInterface[] | null>;
  saveSocialNetworks: (data: SocialNetworkInterface) => Promise<void>;
  isLoading: Ref<boolean>;
  isFinished: Ref<boolean>;
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
      await set(
        refDB(
          database,
          "users/" + currentAuthUser.value.uid + "/socialNetworks/" + data.id
        ),
        data
      );
    } else {
      await push(
        refDB(
          database,
          "users/" + currentAuthUser.value.uid + "/socialNetworks"
        ),
        data
      );
    }
    isLoading.value = false;
    isFinished.value = true;
  }

  const socialNetworks = computed((): SocialNetworkInterface[] | null => {
    if (user.value) {
      return convertObjectsCollectionsToArrayCollections(
        user.value.socialNetworks
      )?.sort((a: SocialNetworkInterface, b: SocialNetworkInterface) =>
        a.order > b.order ? 1 : -1
      );
    }
    return null;
  });

  function getSocialNetworkById(id: string): SocialNetworkInterface {
    return socialNetworks.value?.find(
      (sn) => sn.id === id
    ) as SocialNetworkInterface;
  }

  async function deleteSocialNetwork(id: string) {
    isFinished.value = false;
    isLoading.value = true;

    remove(
      refDB(
        database,
        "users/" + currentAuthUser.value.uid + "/socialNetworks/" + id
      )
    );

    isLoading.value = false;
    isFinished.value = true;
  }

  async function updateOrderSocialNetworks(
    socialNetworks: SocialNetworkInterface[]
  ): Promise<void> {
    isFinished.value = false;
    isLoading.value = true;
    socialNetworks.forEach((sn, index) => {
      set(
        refDB(
          database,
          "users/" + currentAuthUser.value.uid + "/socialNetworks/" + sn.id
        ),
        { ...sn, order: index }
      );
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
