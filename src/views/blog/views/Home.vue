<template>
  <div>
    <Banner />
    <div class="container mx-auto max-w-screen-xl">
      <div class="grid grid-cols-3 gap-14">
        <div class="col-span-2 mt-10" v-if="posts">
          <div
            class="mb-6 text-2xl font-extrabold leading-normal text-gray-800"
          >
            Ultimos posts
          </div>
          <PostCard :post="post" :key="post.slug" v-for="post in posts" />
        </div>
        <div class="mt-10">
          <div
            class="mb-6 text-2xl font-extrabold leading-normal text-gray-800"
          >
            Categorias
          </div>
          <div
            class="w-full rounded-md bg-white p-4 shadow transition-shadow hover:shadow-lg"
          >
            <CategoriesList />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import usePosts from "@/composables/blog/usePosts";
import Banner from "@/components/blog/Banner.vue";
import PostCard from "@/components/blog/PostCard.vue";
import CategoriesList from "@/components/blog/CategoriesList.vue";
const { fetchPosts, posts } = usePosts();
if (!posts.value.length) {
  fetchPosts();
}
</script>
