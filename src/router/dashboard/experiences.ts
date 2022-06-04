import { RouteRecordRaw } from "vue-router";

const route: RouteRecordRaw = {
  path: "experiences",
  name: "dashboard-experiences",
  component: () =>
    import(
      /* webpackChunkName: "dashboard-experiences" */ "@/views/dashboard/views/Experiences.vue"
    ),
  meta: {
    requiresAuth: true,
    breadCrumb: "Experiences",
  },
  children: [
    {
      path: "",
      name: "dashboard-experiences-list",
      component: () =>
        import(
          /* webpackChunkName: "dashboard-experiences-list" */ "@/components/experiences/ExperiencesList.vue"
        ),
    },
    {
      path: "create",
      name: "dashboard-experiences-create",
      component: () =>
        import(
          /* webpackChunkName: "dashboard-experiences-create" */ "@/components/experiences/ExperienceForm.vue"
        ),
      meta: {
        requiresAuth: true,
        breadCrumb: "New",
      },
    },
    {
      path: "edit/:id",
      name: "dashboard-experiences-edit",
      props: true,
      component: () =>
        import(
          /* webpackChunkName: "dashboard-experiences-edit" */ "@/components/experiences/ExperienceForm.vue"
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
