<template>
  <div>
    <div class="mb-4 flex items-center justify-between">
      <div class="font-semibold">{{ $t("My social media") }}</div>
      <ButtonComponent
        :to="{ name: 'dashboard-social-networks-create' }"
        :text="$t('Create')"
        size="sm"
      />
    </div>

    <draggable
      v-if="elementsToOrder"
      v-model="elementsToOrder"
      @start="drag = true"
      @end="drag = false"
      item-key="id"
      :sort="sort"
      @change="updateOrder"
    >
      <template #item="{ element: sn }">
        <ListItem>
          <template #image>
            <component
              class="p-1"
              :is="getSocialNetworkIconComponent(sn.name)"
              color="#fff"
            />
          </template>
          <template #title>
            <span class="capitalize">{{ sn.name }}</span>
          </template>
          <template #subtitle> Link: {{ sn.link }} </template>
          <template #button>
            <Dropdown>
              <template #activator>
                <IconComponent
                  name="DotsVerticalIcon"
                  class="text-red bg-red w-5"
                />
              </template>
              <template #content>
                <DropdownMenuItem
                  is="router-link"
                  :to="{
                    name: 'dashboard-social-networks-edit',
                    params: { id: sn.id },
                  }"
                >
                  {{ $t("Edit") }}
                </DropdownMenuItem>
                <DropdownMenuItem
                  @click="
                    id = sn.id;
                    isOpen = true;
                  "
                >
                  {{ $t("Delete") }}
                </DropdownMenuItem>
              </template>
            </Dropdown>
          </template>
        </ListItem>
      </template>
    </draggable>
    <SocialNetworkModalDelete
      :isOpen="isOpen"
      @close="
        isOpen = false;
        id = '';
      "
      @confirm="submit"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, watch } from "vue";

import { useSocialNetworks } from "@/composables/useSocialNetworks";
import ListItem from "@/components/common/list/ListItem.vue";
import Dropdown from "@/components/common/dropdown/Dropdown.vue";
import DropdownMenuItem from "@/components/common/dropdown/DropdownMenuItem.vue";
import SocialNetworkModalDelete from "./SocialNetworkModalDelete.vue";
import useNotifications from "@/composables/useNotifications";
import { getSocialNetworkIconComponent } from "@/utils/socialNetwork";
import draggable from "vuedraggable";
import SocialNetworkInterface from "@/definitions/entities/SocialNetworksInterface";
import { ButtonComponent } from "vue-vite-components";
import { IconComponent } from "vue-vite-components";

const { pushNotification } = useNotifications();

const {
  socialNetworks,
  deleteSocialNetwork,
  isFinished,
  updateOrderSocialNetworks,
} = useSocialNetworks();

const isOpen = ref(false);
const id = ref("");
async function submit() {
  await deleteSocialNetwork(id.value);
  if (isFinished) {
    isOpen.value = false;
    id.value = "";
    pushNotification({
      id: "",
      title: "Eliminado",
      description: "Red social eliminada",
      type: "success",
    });
  }
}

const drag = ref(false);
const sort = ref(true);

async function updateOrder() {
  if (elementsToOrder.value) {
    await updateOrderSocialNetworks(elementsToOrder.value);
    if (isFinished) {
      pushNotification({
        id: "",
        title: "Orden actualizado",
        description: "Tus redes sociales se han ordenado",
        type: "success",
      });
    }
  }
}

const elements = computed((): SocialNetworkInterface[] | null =>
  socialNetworks.value
    ? socialNetworks.value.map((element) => {
        return {
          ...element,
          id: element.id,
        };
      })
    : null
);

const elementsToOrder = ref(elements.value);

watch(elements, (value) => {
  elementsToOrder.value = value;
});
</script>
