<template>
  <div>
    <div class="mb-4 flex items-center justify-between">
      <div>{{ $t("My languages") }}</div>
      <ButtonComponent
        :to="{ name: 'dashboard-languages-create' }"
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
              :src="
                require(`@/assets/img/languages/${element.languageId}.svg`)
              "
          /></template>
          <template #title>
            {{
              languagesData?.find((l) => l.id == element.languageId)?.name[
                currentLocale
              ]
            }}
          </template>
          <template #subtitle>
            {{ element.description[currentLocale] }}
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
                    name: 'dashboard-languages-edit',
                    params: { id: element.id },
                  }"
                >
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  @click="
                    id = element.id;
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
    <LanguagesModalDelete
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
import useLanguages from "@/composables/useLanguages";
import ListItem from "@/components/common/list/ListItem.vue";
import Dropdown from "@/components/common/dropdown/Dropdown.vue";
import DropdownMenuItem from "@/components/common/dropdown/DropdownMenuItem.vue";
import useNotifications from "@/composables/useNotifications";
import LanguagesModalDelete from "./LanguagesModalDelete.vue";
import draggable from "vuedraggable";
import LanguageInterface from "@/definitions/entities/LanguageInterface";
import languagesData from "@/data/languages.json";
import useLocale from "@/composables/useLocale";
import { ButtonComponent } from "vue-vite-components";
import { IconComponent } from "vue-vite-components";

const { currentLocale } = useLocale();
const { languages, deleteLanguage, isFinished, updateOrderLanguages } =
  useLanguages();
const isOpen = ref(false);
const id = ref("");
const { pushNotification } = useNotifications();

async function submit() {
  await deleteLanguage(id.value);
  if (isFinished) {
    isOpen.value = false;
    id.value = "";
    pushNotification({
      id: "",
      title: "Eliminado",
      description: "Idioma eliminado",
      type: "success",
    });
  }
}

const drag = ref(false);
const sort = ref(true);

async function updateOrder() {
  if (elementsToOrder.value) {
    await updateOrderLanguages(elementsToOrder.value);
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

const elements = computed((): LanguageInterface[] | null =>
  languages.value
    ? languages.value.map((element) => {
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
