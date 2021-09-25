<template>
  <div class="bg-white border p-4">
    <div class="flex justify-between">
      <div>Mis estudios</div>
      <Button :to="{ name: 'dashboard-studies-create' }">Añadir</Button>
    </div>
    <ListItem :key="study.id" v-for="study in studies">
      <template #image>
        <img v-if="study.image" class="w-8 h-8" :src="study.image" alt="" />
        <template v-else>{{ study.institute[0] }}</template>
      </template>
      <template #title>
        {{ study.title }}
      </template>
      <template #subtitle>
        {{ study.institute }}
      </template>
      <template #button>
        <Dropdown>
          <template #activator>
            <Icon name="DotsVerticalIcon" class="text-red bg-red w-5" />
          </template>
          <template #content>
            <DropdownMenuItem
              is="router-link"
              :to="{
                name: 'dashboard-studies-edit',
                params: { id: study.id },
              }"
            >
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem @click="confirmDeleteStudy(study.id)">
              Eliminar
            </DropdownMenuItem>
          </template>
        </Dropdown>
      </template>
    </ListItem>
    {{ studies }}
  </div>
</template>
<script lang="ts">
// TODO: create list components, create useStudies to get, create, update amd delete studies

import { defineComponent } from "vue";
import Button from "@/components/common/button/Button.vue";
import { useUser } from "@/composables/useUser";
import ListItem from "@/components/common/list/ListItem.vue";
import Dropdown from "@/components/common/dropdown/Dropdown.vue";
import DropdownMenuItem from "@/components/common/dropdown/DropdownMenuItem.vue";
import Icon from "@/components/common/Icon.vue";
export default defineComponent({
  components: {
    Button,
    ListItem,
    Dropdown,
    DropdownMenuItem,
    Icon,
  },
  setup() {
    const { studies } = useUser();
    return {
      studies,
    };
  },
});
</script>
