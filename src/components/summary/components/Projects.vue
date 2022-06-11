<template>
  <div>
    <SectionTitle :user="user">{{ $t("Projects") }}</SectionTitle>
    <a
      :key="'project-' + k"
      v-for="(project, k) in projects"
      :href="project.url"
      target="_blank"
    >
      <CardComponent>
        <template #title>
          {{ project.name }}
        </template>
        <template #subtitle>
          {{ project.url }}
        </template>
        <template #content>
          {{ project.description[currentLocale] }}
        </template>
      </CardComponent>
    </a>
  </div>
</template>

<script lang="ts" setup>
import { PropType, computed } from "vue";
import { UserInterface } from "@/definitions/entities/UserInterface";
import ProjectInterface from "@/definitions/entities/ProjectInterface";
import SectionTitle from "./SectionTitle.vue";
import { useFirebase } from "@/composables/useFirebase";
import useLocale from "@/composables/useLocale";
import { CardComponent } from "vue-vite-components";

const props = defineProps({
  user: {
    type: Object as PropType<UserInterface>,
    required: true,
  },
});
const { convertObjectsCollectionsToArrayCollections } = useFirebase();

const projects = computed(() => {
  const projects = convertObjectsCollectionsToArrayCollections(
    props.user.projects as ProjectInterface[]
  );
  if (projects.every((e) => !e.order)) {
    projects.reverse();
  }
  return projects;
});
const { currentLocale } = useLocale();
</script>
