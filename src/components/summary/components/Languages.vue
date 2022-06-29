<template>
  <div>
    <SectionTitle :user="user">{{ $t("Languages") }}</SectionTitle>
    <div
      :key="'language-' + language.id"
      v-for="(language, k) in languages"
      class="align-items-center flex"
      :class="k > 0 ? 'mt-2' : ''"
    >
      <!-- <span v-if="k > 0"> • </span> -->
      <img
        :src="require(`@/assets/img/languages/${language.languageId}.svg`)"
        width="32"
        height="44"
        class="mr-2 inline"
        :alt="
          languagesData?.find((l) => l.id == language.languageId)?.name[
            currentLocale
          ]
        "
      />
      <div>
        <div class="-mb-1 block">
          {{
            languagesData?.find((l) => l.id == language.languageId)?.name[
              currentLocale
            ]
          }}
        </div>
        <span class="text-xs"> {{ language.description[currentLocale] }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, computed } from "vue";
import { UserInterface } from "@/definitions/entities/UserInterface";
import SectionTitle from "./SectionTitle.vue";
import { useFirebase } from "@/composables/useFirebase";
import LanguageModel from "@/models/LanguageModel";
import useLocale from "@/composables/useLocale";
import languagesData from "@/data/languages.json";

const props = defineProps({
  user: {
    type: Object as PropType<UserInterface>,
    required: true,
  },
});
const { currentLocale } = useLocale();

const { convertObjectsCollectionsToArrayCollections } = useFirebase();

const languages = computed(() => {
  const languages = convertObjectsCollectionsToArrayCollections(
    props.user.languages as LanguageModel[]
  ).map((l) => new LanguageModel(l));
  return languages.every((e) => !e.order) ? languages.reverse() : languages;
});
</script>
