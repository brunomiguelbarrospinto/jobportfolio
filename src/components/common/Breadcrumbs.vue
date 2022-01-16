<template>
  <nav class="text-black font-semibold my-8" aria-label="Breadcrumb">
    <div class="list-none p-0 inline-flex">
      <template :key="'crumb-' + index" v-for="(crumb, index) in crumbs">
        <router-link
          v-if="crumbs.length - 1 !== index"
          :to="crumb.to"
          class="flex items-center"
        >
          <span>
            {{ crumb.text }}
          </span>
          <Icon name="ChevronRightIcon" class="fill-current w-3 h-3 mx-3" />
        </router-link>
        <span v-else class="text-gray-500">
          {{ crumb.text }}
        </span>
      </template>
    </div>
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
    interface Breadcrumb {
      path: string;
      to: string;
    }
    const route = useRoute();
    const crumbs = computed(() => {
      let pathArray = route.path.split("/");
      pathArray.shift();
      let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        if (!route.matched[idx - 1]?.meta?.dinamicRoute) {
          breadcrumbArray.push({
            path: path,
            to: breadcrumbArray[idx - 1]
              ? "/" + breadcrumbArray[idx - 1].path + "/" + path
              : "/" + path,
            text: route.matched[idx].meta.breadCrumb || path,
          } as Breadcrumb);
        }
        return breadcrumbArray;
      }, [] as Breadcrumb[]);
      return breadcrumbs;
    });

    return {
      crumbs,
    };
  },
});
</script>
