import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/profile/:email",
    name: "profile-index",
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "profile-index" */ "@/views/profile/Index.vue"
      ),
    meta: { isPublic: true },

    children: [
      {
        path: "",
        name: "profile",
        component: () =>
          import(
            /* webpackChunkName: "profile" */ "@/views/profile/Profile.vue"
          ),
        meta: { isPublic: true },
      },
    ],
  },
];

export default routes;
