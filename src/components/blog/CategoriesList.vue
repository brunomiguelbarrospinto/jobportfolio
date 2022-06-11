<template>
  <div class="flex flex-wrap" v-if="categories.length">
    <router-link
      :key="category.title"
      v-for="category in categories"
      :to="`/category/${category.slug}`"
      class="mr-2 mb-2"
    >
      <TagComponent :text="category.title" :backgroundColor="category.color" />
    </router-link>
  </div>
</template>

<script setup lang="ts">
import useCategories from "@/composables/blog/useCategories";
import { TagComponent } from "vue-vite-components";
const { fetchCategories, categories } = useCategories();
if (!categories.value.length) {
  fetchCategories();
}
</script>
