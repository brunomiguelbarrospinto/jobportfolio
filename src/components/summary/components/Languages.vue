<template>
  <div>
    <SectionTitle :user="user">Idiomas</SectionTitle>
    <div
      :key="'language-' + language.id"
      v-for="(language, k) in languages"
      class="inline-flex align-items-center"
      :class="k > 0 ? 'ml-6' : ''"
    >
      <!-- <span v-if="k > 0"> • </span> -->
      <img
        :src="require(`@/assets/img/languages/${language.languageId}.svg`)"
        width="32"
        class="inline mr-2"
      />
      <div>
        <div class="block -mb-1">{{ language.name }}</div>
        <span class="text-gray-500 text-xs"> {{ language.description }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { UserInterface } from "@/definitions/entities/UserInterface";
import SectionTitle from "./SectionTitle.vue";
import { useFirebase } from "@/composables/useFirebase";
import LanguageModel from "@/models/LanguageModel";
export default defineComponent({
  components: { SectionTitle },
  props: {
    user: {
      type: Object as PropType<UserInterface>,
      required: true,
    },
  },
  setup(props) {
    const { convertObjectsCollectionsToArrayCollections } = useFirebase();

    const languages = computed(() => {
      const languages = convertObjectsCollectionsToArrayCollections(
        props.user.languages as LanguageModel[]
      ).map((l) => new LanguageModel(l));
      return languages.every((e) => !e.order) ? languages.reverse() : languages;
    });

    return { languages };
  },
});
</script>
