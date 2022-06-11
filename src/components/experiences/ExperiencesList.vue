<template>
  <div>
    <div class="mb-4 flex items-center justify-between">
      <div>{{ $t("My experiences") }}</div>
      <ButtonComponent
        :to="{ name: 'dashboard-experiences-create' }"
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
      <template #item="{ element }">
        <ListItem>
          <template #image>
            <img
              v-if="element.logo"
              class="h-8 w-8"
              :src="element.logo"
              alt=""
            />
            <template v-else>{{ element.company[0] }}</template>
          </template>
          <template #title>
            {{ element.company }}
          </template>
          <template #subtitle>
            {{ element.position[currentLocale] }}
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
                    name: 'dashboard-experiences-edit',
                    params: { id: element.id },
                  }"
                >
                  {{ $t("Edit") }}
                </DropdownMenuItem>
                <DropdownMenuItem
                  @click="
                    id = element.id;
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
    <ExperienceModalDelete
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
import useExperiences from "@/composables/useExperiences";
import ListItem from "@/components/common/list/ListItem.vue";
import Dropdown from "@/components/common/dropdown/Dropdown.vue";
import DropdownMenuItem from "@/components/common/dropdown/DropdownMenuItem.vue";
import useNotifications from "@/composables/useNotifications";
import ExperienceModalDelete from "./ExperienceModalDelete.vue";
import draggable from "vuedraggable";
import ExperienceInterface from "@/definitions/entities/ExperienceInterface";
import useLocale from "@/composables/useLocale";
import { ButtonComponent } from "vue-vite-components";
import { IconComponent } from "vue-vite-components";

const { currentLocale } = useLocale();
const { experiences, deleteExperience, isFinished, updateOrderExperiences } =
  useExperiences();
const isOpen = ref(false);
const id = ref("");
const { pushNotification } = useNotifications();

async function submit() {
  await deleteExperience(id.value);
  if (isFinished) {
    isOpen.value = false;
    id.value = "";
    pushNotification({
      id: "",
      title: "Eliminado",
      description: "Experiencia eliminada",
      type: "success",
    });
  }
}

const drag = ref(false);
const sort = ref(true);

async function updateOrder() {
  if (elementsToOrder.value) {
    await updateOrderExperiences(elementsToOrder.value);
    if (isFinished) {
      pushNotification({
        id: "",
        title: "Orden actualizado",
        description: "Tus experiencias se han ordenado",
        type: "success",
      });
    }
  }
}

const elements = computed((): ExperienceInterface[] | null =>
  experiences.value
    ? experiences.value.map((element) => {
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
