<template>
  <div>
    <div class="mb-4 flex items-center justify-between">
      <div>{{ $t("My studies") }}</div>
      <ButtonComponent
        :to="{ name: 'dashboard-studies-create' }"
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
      <template #item="{ element: study }">
        <ListItem>
          <template #image>
            <img v-if="study.image" class="h-8 w-8" :src="study.image" alt="" />
            <template v-else>{{ study.institute[0] }}</template>
          </template>
          <template #title>
            {{ study.title[currentLocale] }}
          </template>
          <template #subtitle>
            {{ study.institute[currentLocale] }}
          </template>
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
                    name: 'dashboard-studies-edit',
                    params: { id: study.id },
                  }"
                >
                  {{ $t("Edit") }}
                </DropdownMenuItem>
                <DropdownMenuItem
                  @click="
                    id = study.id;
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
    <StudyModalDelete
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
// TODO: create list components, create useStudies to get, create, update amd delete studies

import { ref, computed, watch } from "vue";

import { useStudies } from "@/composables/useStudies";
import ListItem from "@/components/common/list/ListItem.vue";
import Dropdown from "@/components/common/dropdown/Dropdown.vue";
import DropdownMenuItem from "@/components/common/dropdown/DropdownMenuItem.vue";
import useNotifications from "@/composables/useNotifications";
import StudyModalDelete from "./StudyModalDelete.vue";
import draggable from "vuedraggable";
import StudyInterface from "@/definitions/entities/StudyInterface";
import useLocale from "@/composables/useLocale";
import { ButtonComponent } from "vue-vite-components";
import { IconComponent } from "vue-vite-components";

const { currentLocale } = useLocale();

const { studies, deleteStudy, isFinished, updateOrderStudies } = useStudies();
const isOpen = ref(false);
const id = ref("");
const { pushNotification } = useNotifications();

async function submit() {
  await deleteStudy(id.value);
  if (isFinished) {
    isOpen.value = false;
    id.value = "";
    pushNotification({
      id: "",
      title: "Eliminado",
      description: "Estudio eliminado",
      type: "success",
    });
  }
}

const drag = ref(false);
const sort = ref(true);

async function updateOrder() {
  if (elementsToOrder.value) {
    await updateOrderStudies(elementsToOrder.value);
    if (isFinished) {
      pushNotification({
        id: "",
        title: "Orden actualizado",
        description: "Tus estudios se han ordenado",
        type: "success",
      });
    }
  }
}

const elements = computed((): StudyInterface[] | null =>
  studies.value
    ? studies.value.map((element) => {
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
