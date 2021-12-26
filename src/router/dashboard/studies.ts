import { RouteRecordRaw } from "vue-router";

const route: RouteRecordRaw = {
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
};

export default route;
