<template>
  <div class="container mx-auto max-w-screen-xl">
    <div class="grid grid-cols-2 gap-5" v-if="post">
      <div class="p-5">
        <h1 class="mb-1 text-3xl font-extrabold leading-normal text-gray-800">
          {{ post.title }}
        </h1>
        <div class="text-md mb-4 font-medium text-gray-500">
          {{ post.publishedAt }}
        </div>
        <img :src="post.mainImage" class="w-full object-cover" />
        <SanityBlocks :blocks="post.body" :serializers="serializers" />
      </div>
      <div class="p-5">
        <h1 class="mb-1 text-3xl font-extrabold leading-normal text-gray-800">
          {{ post.title }}
        </h1>
        <div class="text-md mb-4 font-medium text-gray-500">
          {{ post.publishedAt }}
        </div>
        <img :src="post.mainImage" class="w-full object-cover" />
        <SanityBlocks :blocks="post.body" :serializers="serializers2" />
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { useRoute } from "vue-router";
import usePost from "@/composables/blog/usePost";
import { SanityBlocks } from "sanity-blocks-vue-component";

import Code from "./Code.vue";
import CodeHighlighter from "./CodeHighlighter.vue";

const route = useRoute();

const { fetchPost, post } = usePost();
fetchPost({ slug: route.params.slug });

const serializers = {
  types: {
    code: (props) => {
      console.log(props);

      return <CodeHighlighter language={props.language} code={props.code} />;
    },
  },
};

const serializers2 = {
  types: {
    code: (props) => {
      console.log(props);

      return <Code language={props.language} code={props.code} />;
    },
  },
};
</script>
