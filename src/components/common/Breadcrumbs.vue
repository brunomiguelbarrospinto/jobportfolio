<template>
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <div class="inline-flex list-none p-0">
      <template :key="'crumb-' + index" v-for="(crumb, index) in crumbs">
        <router-link
          v-if="crumbs.length - 1 !== index"
          :to="crumb.to"
          class="flex items-center"
        >
          <span>
            {{ $t(crumb.text) }}
          </span>
          <IconComponent
            name="ChevronRightIcon"
            class="mx-2 h-4 w-4 fill-current"
          />
        </router-link>
        <span v-else class="text-gray-500">
          {{ $t(crumb.text) }}
        </span>
      </template>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { IconComponent } from "vue-vite-components";
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
</script>

<style lang="scss" scoped>
.breadcrumb {
  @apply my-5 text-base text-sm font-normal;
}
</style>
