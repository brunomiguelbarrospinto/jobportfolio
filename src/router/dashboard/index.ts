import { RouteRecordRaw } from "vue-router";
import SocialNetworksRoutes from "./social-networks";
import StudiesRoutes from "./studies";
import CoursesRoutes from "./courses";
import KnowledgeRoutes from "./knowledge";
import ExperiencesRoutes from "./experiences";
import ProjectsRoutes from "./projects";

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
    // TODO: split children routes in different files
    // TODO: unify webpackChunkName convention name
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
      SocialNetworksRoutes,
      StudiesRoutes,
      CoursesRoutes,
      KnowledgeRoutes,
      ExperiencesRoutes,
      ProjectsRoutes,
    ],
  },
];

export default routes;
