import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ "@/views/dashboard/Dashboard.vue"
      ),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        name: "dashboard-home",
        component: () =>
          import(
            /* webpackChunkName: "dashboard-home" */ "@/views/dashboard/views/Home.vue"
          ),
      },
    ],
  },
];

export default routes;
