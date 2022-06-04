import { RouteRecordRaw } from "vue-router";

const route: RouteRecordRaw = {
  path: "languages",
  name: "dashboard-languages",
  component: () =>
    import(
      /* webpackChunkName: "dashboard-languages" */ "@/views/dashboard/views/Languages.vue"
    ),
  meta: {
    requiresAuth: true,
    breadCrumb: "Languages",
  },
  children: [
    {
      path: "",
      name: "dashboard-languages-list",
      component: () =>
        import(
          /* webpackChunkName: "dashboard-languages-list" */ "@/components/languages/LanguagesList.vue"
        ),
    },
    {
      path: "create",
      name: "dashboard-languages-create",
      component: () =>
        import(
          /* webpackChunkName: "dashboard-languages-create" */ "@/components/languages/LanguagesForm.vue"
        ),
      meta: {
        requiresAuth: true,
        breadCrumb: "Create",
      },
    },
    {
      path: "edit/:id",
      name: "dashboard-languages-edit",
      props: true,
      component: () =>
        import(
          /* webpackChunkName: "dashboard-languages-edit" */ "@/components/languages/LanguagesForm.vue"
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
