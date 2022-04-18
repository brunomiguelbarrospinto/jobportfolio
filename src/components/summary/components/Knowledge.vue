<template>
  <div>
    <SectionTitle :user="user">Conocimientos</SectionTitle>

    <a
      :href="knowledgeItem.url"
      target="_blank"
      :key="'knowledge-item-' + knowledgeItem.id"
      v-for="knowledgeItem in knowledge"
    >
      <TagComponent
        :text="knowledgeItem.name"
        class="mr-3 mb-3 hover:shadow-md"
        :backgroundColor="knowledgeItem.color"
      />
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { UserInterface } from "@/definitions/entities/UserInterface";
import SectionTitle from "./SectionTitle.vue";
import { useFirebase } from "@/composables/useFirebase";
import KnowledgeInterface from "@/definitions/entities/KnowledgeInterface";
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

    const knowledge = computed(() => {
      const knowledge = convertObjectsCollectionsToArrayCollections(
        props.user.knowledge as KnowledgeInterface[]
      );
      if (knowledge.every((e) => !e.order)) {
        knowledge.reverse();
      }
      return knowledge;
    });

    return { knowledge };
  },
});
</script>
