<template>
  <nav class="text-black font-bold my-8" aria-label="Breadcrumb">
    <ol class="list-none p-0 inline-flex">
      <router-link
        :to="crumb.path"
        tag="li"
        v-for="(crumb, index) in crumbs"
        :key="'crumb-' + index"
        class="flex items-center"
      >
        <Icon
          v-if="index > 0"
          name="ChevronRight"
          class="fill-current w-3 h-3 mx-3"
        />
        <span :class="{ 'text-gray-500': crumbs.length - 1 === index }">
          {{ crumb.text }}
        </span>
      </router-link>
    </ol>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Icon from "@/components/common/Icon.vue";
import { useRoute } from "vue-router";
export default defineComponent({
  components: {
    Icon,
  },
  setup() {
    const route = useRoute();
    const crumbs = computed(() => {
      let pathArray = route.path.split("/");
      pathArray.shift();
      let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        breadcrumbArray.push({
          path: path,
          to: breadcrumbArray[idx - 1]
            ? "/" + breadcrumbArray[idx - 1].path + "/" + path
            : "/" + path,
          text: route.matched[idx].meta.breadCrumb || path,
        } as any);
        return breadcrumbArray;
      }, [] as any);
      return breadcrumbs;
    });

    return {
      crumbs,
    };
  },
});
</script>
