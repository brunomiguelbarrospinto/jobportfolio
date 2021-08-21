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
      {
        path: "studies",
        name: "dashboard-studies",
        component: () =>
          import(
            /* webpackChunkName: "dashboard-studies" */ "@/views/dashboard/views/Studies.vue"
          ),
        meta: {
          requiresAuth: true,
          breadCrumb: "Estudios",
        },
        children: [
          {
            path: "",
            name: "dashboard-studies-list",
            component: () =>
              import(
                /* webpackChunkName: "dashboard-studies-list" */ "@/components/studies/StudiesList.vue"
              ),
          },
          {
            path: "create",
            name: "dashboard-studies-create",
            component: () =>
              import(
                /* webpackChunkName: "dashboard-studies-create" */ "@/components/studies/StudiesForm.vue"
              ),
            meta: {
              requiresAuth: true,
              breadCrumb: "Crear estudio",
            },
          },
          {
            path: "edit/:id",
            name: "dashboard-studies-edit",
            props: true,
            component: () =>
              import(
                /* webpackChunkName: "dashboard-studies-edit" */ "@/components/studies/StudiesForm.vue"
              ),
            meta: {
              requiresAuth: true,
              breadCrumb: "Editar estudio",
              dinamicRoute: true,
            },
          },
        ],
      },
    ],
  },
];

export default routes;
