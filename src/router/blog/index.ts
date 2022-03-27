import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/blog",
    name: "blog",
    component: () =>
      import(/* webpackChunkName: "blog" */ "@/views/blog/Blog.vue"),
    meta: { isPublic: true },
    children: [
      {
        path: "",
        name: "blog-home",
        component: () =>
          import(
            /* webpackChunkName: "blog-home" */ "@/views/blog/views/Home.vue"
          ),
      },
      {
        path: "posts",
        name: "blog-psots",
        component: () =>
          import(
            /* webpackChunkName: "blog-posts" */ "@/views/blog/views/Posts.vue"
          ),
      },
      {
        path: "posts/:slug",
        name: "blog-post",
        component: () =>
          import(
            /* webpackChunkName: "blog-post" */ "@/views/blog/views/Post.vue"
          ),
        props: true,
      },
    ],
  },
];

export default routes;
