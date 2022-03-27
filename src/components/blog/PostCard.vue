<template>
  <div
    class="flex w-full rounded-md bg-white p-4 shadow transition-shadow hover:shadow-lg"
  >
    <div class="mr-4 aspect-square w-56">
      <img :src="post.mainImage" class="h-full w-full object-cover" />
    </div>
    <div>
      <div class="mb-4">
        <router-link
          :key="post.slug + category.title"
          v-for="category in post.categories"
          :to="`/category/${category.slug}`"
          class="mr-2"
        >
          <Label :text="category.title" :bgColor="category.color" />
        </router-link>
      </div>
      <router-link
        :to="{ name: 'blog-post', params: { slug: post.slug } }"
        class="text-xl font-bold text-gray-700 hover:underline"
      >
        {{ post.title }}
      </router-link>
      <div class="mt-4 flex items-center">
        <div class="w-14">
          <img :src="post.author.image" class="mx-auto rounded-full" />
        </div>
        <div class="ml-4">
          <div class="mb-1 font-semibold text-gray-600">
            {{ post.author.name }}
          </div>
          <div class="text-sm font-medium text-gray-500">
            {{ post.publishedAt }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Label from "@/components/common/Label.vue";
const props = defineProps({
  post: Object,
});
</script>
