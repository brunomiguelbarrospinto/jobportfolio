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
    breadCrumb: "Studies",
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
        breadCrumb: "Create",
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
        breadCrumb: "Edit",
        dinamicRoute: true,
      },
    },
  ],
};

export default route;
