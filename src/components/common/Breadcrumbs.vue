<template>
  <nav
    class="flex rounded-lg border border-gray-200 bg-gray-50 py-3 px-5 text-gray-700 dark:border-gray-700 dark:bg-gray-800"
    aria-label="Breadcrumb"
  >
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li class="inline-flex items-center">
        <a
          href="#"
          class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <svg
            class="mr-2 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
            ></path>
          </svg>
          Home
        </a>
      </li>
      <li>
        <div class="flex items-center">
          <svg
            class="h-6 w-6 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <a
            href="#"
            class="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:ml-2"
            >Templates</a
          >
        </div>
      </li>
      <li aria-current="page">
        <div class="flex items-center">
          <svg
            class="h-6 w-6 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span
            class="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ml-2"
            >Flowbite</span
          >
        </div>
      </li>
    </ol>
  </nav>
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
