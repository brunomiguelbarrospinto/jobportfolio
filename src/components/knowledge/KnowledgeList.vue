<template>
  <div>
    <div class="mb-4 flex items-center justify-between">
      <div>{{ $t("My knowledge") }}</div>
      <ButtonComponent
        :to="{ name: 'dashboard-knowledge-create' }"
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
          <template #title>
            {{ element.name[currentLocale] }}
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
                    name: 'dashboard-knowledge-edit',
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
    <KnowledgeModalDelete
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
import useKnowledge from "@/composables/useKnowledge";
import ListItem from "@/components/common/list/ListItem.vue";
import Dropdown from "@/components/common/dropdown/Dropdown.vue";
import DropdownMenuItem from "@/components/common/dropdown/DropdownMenuItem.vue";
import useNotifications from "@/composables/useNotifications";
import KnowledgeModalDelete from "./KnowledgeModalDelete.vue";
import draggable from "vuedraggable";
import KnowledgeInterface from "@/definitions/entities/KnowledgeInterface";
import useLocale from "@/composables/useLocale";
import { ButtonComponent } from "vue-vite-components";
import { IconComponent } from "vue-vite-components";

const { knowledge, deleteKnowledge, isFinished, updateOrderKnowledge } =
  useKnowledge();
const isOpen = ref(false);
const id = ref("");
const { pushNotification } = useNotifications();
const { currentLocale } = useLocale();

async function submit() {
  await deleteKnowledge(id.value);
  if (isFinished) {
    isOpen.value = false;
    id.value = "";
    pushNotification({
      id: "",
      title: "Eliminado",
      description: "Conocimiento eliminad",
      type: "success",
    });
  }
}

const drag = ref(false);
const sort = ref(true);

async function updateOrder() {
  if (elementsToOrder.value) {
    await updateOrderKnowledge(elementsToOrder.value);
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

const elements = computed((): KnowledgeInterface[] | null =>
  knowledge.value
    ? knowledge.value.map((element) => {
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
