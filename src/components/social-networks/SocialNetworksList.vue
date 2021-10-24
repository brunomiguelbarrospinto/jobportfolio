<template>
  <div class="bg-white border p-4">
    <div class="flex justify-between">
      <div>Mis redes sociales</div>
      <Button
        :to="{ name: 'dashboard-social-networks-create' }"
        text="Añadir"
      />
    </div>
    <!--<ListItem key="sn.id" v-for="sn in socialNetworks">
      <template #title>
        {{ sn.name }}
      </template>
      <template #subtitle> Orden: {{ sn.order }} </template>
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
            <DropdownMenuItem @click="confirmDeleteSocialNetwork(sn.id)">
              Eliminar
            </DropdownMenuItem>
          </template>
        </Dropdown>
      </template>
    </ListItem> -->
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/common/button/Button.vue";
import { useSocialNetworks } from "@/composables/useSocialNetworks";
import ListItem from "@/components/common/list/ListItem.vue";
import Dropdown from "@/components/common/dropdown/Dropdown.vue";
import DropdownMenuItem from "@/components/common/dropdown/DropdownMenuItem.vue";
import Icon from "@/components/common/Icon.vue";
export default defineComponent({
  components: {
    Button,
    /*ListItem,
    Dropdown,
    DropdownMenuItem,
    Icon,*/
  },
  setup() {
    const { socialNetworks } = useSocialNetworks();
    return {
      socialNetworks,
    };
  },
});
</script>
