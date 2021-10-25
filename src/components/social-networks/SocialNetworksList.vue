<template>
  <div>
    <div class="bg-white border p-4">
      <div class="flex justify-between">
        <div class="font-semibold">Mis redes sociales</div>
        <Button
          :to="{ name: 'dashboard-social-networks-create' }"
          text="Añadir"
        />
      </div>
      <ListItem :key="sn.id" v-for="sn in socialNetworks">
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
export default defineComponent({
  components: {
    Button,
    ListItem,
    Dropdown,
    DropdownMenuItem,
    Icon,
    SocialNetworkModalDelete,
  },
  setup() {
    const { pushNotification } = useNotifications();

    const { socialNetworks, deleteSocialNetwork, isFinished } =
      useSocialNetworks();
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
    return {
      id,
      socialNetworks,
      isOpen,
      submit,
    };
  },
});
</script>
