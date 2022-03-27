<template>
  <div class="flex flex-wrap" v-if="categories.length">
    <router-link
      :key="category.title"
      v-for="category in categories"
      :to="`/category/${category.slug}`"
      class="mr-2 mb-2"
    >
      <Label :text="category.title" :bgColor="category.color" />
    </router-link>
  </div>
</template>

<script setup lang="ts">
import Label from "@/components/common/Label.vue";
import useCategories from "@/composables/blog/useCategories";

const { fetchCategories, categories } = useCategories();
if (!categories.value.length) {
  fetchCategories();
}
</script>
