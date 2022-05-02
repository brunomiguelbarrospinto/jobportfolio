<template>
  <div>
    <SectionTitle :user="user">Proyectos</SectionTitle>
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
      </CardComponent>
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { UserInterface } from "@/definitions/entities/UserInterface";
import ProjectInterface from "@/definitions/entities/ProjectInterface";
import SectionTitle from "./SectionTitle.vue";
import { useFirebase } from "@/composables/useFirebase";

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

    const projects = computed(() => {
      const projects = convertObjectsCollectionsToArrayCollections(
        props.user.projects as ProjectInterface[]
      );
      if (projects.every((e) => !e.order)) {
        projects.reverse();
      }
      return projects;
    });

    return { projects };
  },
});
</script>
