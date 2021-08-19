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
      breadCrumb: "Dashboard",
    },
    children: [
      {
        path: "",
        name: "dashboard-home",
        component: () =>
          import(
            /* webpackChunkName: "dashboard-home" */ "@/views/dashboard/views/Home.vue"
          ),
        meta: {
          requiresAuth: true,
          breadCrumb: "Inicio",
        },
      },
      {
        path: "banner",
        name: "dashboard-banner",
        component: () =>
          import(
            /* webpackChunkName: "dashboard-banner" */ "@/views/dashboard/views/Banner.vue"
          ),
        meta: {
          requiresAuth: true,
          breadCrumb: "Banner",
        },
      },
      {
        path: "about-me",
        name: "dashboard-about-me",
        component: () =>
          import(
            /* webpackChunkName: "dashboard-about-me" */ "@/views/dashboard/views/AboutMe.vue"
          ),
        meta: {
          requiresAuth: true,
          breadCrumb: "Acerca de mi",
        },
      },
      {
        path: "social-networks",
        name: "dashboard-social-networks",
        component: () =>
          import(
            /* webpackChunkName: "dashboard-social-networks" */ "@/views/dashboard/views/SocialNetworks.vue"
          ),
        meta: {
          requiresAuth: true,
          breadCrumb: "Redes Sociales",
        },
      },
    ],
  },
];

export default routes;
