<template>
  <div>
    <div class="bg-white border p-4">
      <div class="flex justify-between items-center mb-4">
        <div class="font-semibold">Mis redes sociales</div>
        <Button
          :to="{ name: 'dashboard-social-networks-create' }"
          text="Añadir"
        />
      </div>

      <draggable
        v-model="elements"
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
                  <Icon name="DotsVerticalIcon" class="text-red bg-red w-5" />
                </template>
                <template #content>
                  <DropdownMenuItem
                    is="router-link"
                    :to="{
                      name: 'dashboard-social-networks-edit',
                      params: { id: sn.id },
                    }"
                  >
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    @click="
                      id = sn.id;
                      isOpen = true;
                    "
                  >
                    Eliminar
                  </DropdownMenuItem>
                </template>
              </Dropdown>
            </template>
          </ListItem>
        </template>
      </draggable>
    </div>
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
<script lang="ts">
import { defineComponent, ref } from "vue";
import Button from "@/components/common/button/Button.vue";
import { useSocialNetworks } from "@/composables/useSocialNetworks";
import ListItem from "@/components/common/list/ListItem.vue";
import Dropdown from "@/components/common/dropdown/Dropdown.vue";
import DropdownMenuItem from "@/components/common/dropdown/DropdownMenuItem.vue";
import Icon from "@/components/common/Icon.vue";
import SocialNetworkModalDelete from "./SocialNetworkModalDelete.vue";
import useNotifications from "@/composables/useNotifications";
import { getSocialNetworkIconComponent } from "@/utils/socialNetwork";
import draggable from "vuedraggable";
import SocialNetworkInterface from "@/definitions/entities/SocialNetworksInterface";

export default defineComponent({
  components: {
    Button,
    ListItem,
    Dropdown,
    DropdownMenuItem,
    Icon,
    SocialNetworkModalDelete,
    draggable,
  },
  setup() {
    const drag = ref(false);
    const sort = ref(true);
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
    async function updateOrder() {
      await updateOrderSocialNetworks(elements.value);
      if (isFinished) {
        isOpen.value = false;
        id.value = "";
        pushNotification({
          id: "",
          title: "Orden actualizdo",
          description: "Tus redes sociales se han ordenado",
          type: "success",
        });
      }
    }

    const elements = ref<SocialNetworkInterface[]>([]);

    elements.value = socialNetworks.value.map((element) => {
      return {
        ...element,
        id: element.id,
      };
    });

    return {
      id,
      elements,
      isOpen,
      submit,
      getSocialNetworkIconComponent,
      drag,
      sort,
      updateOrder,
    };
  },
});
</script>
