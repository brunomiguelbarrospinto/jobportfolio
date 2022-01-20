<template>
  <div>
    <SectionTitle :user="user">Conocimientos</SectionTitle>

    <a
      :href="knowledgeItem.url"
      target="_blank"
      :key="'knowledge-item-' + knowledgeItem.id"
      v-for="knowledgeItem in knowledge"
    >
      <Label
        :text="knowledgeItem.name"
        class="mr-3 mb-3 hover:shadow-md"
        :bgColor="knowledgeItem.color"
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
import Label from "@/components/common/Label.vue";
export default defineComponent({
  components: { SectionTitle, Label },
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
