import { RouteRecordRaw } from "vue-router";

const route: RouteRecordRaw = {
  path: "projects",
  name: "dashboard-projects",
  component: () =>
    import(
      /* webpackChunkName: "dashboard-projects" */ "@/views/dashboard/views/Projects.vue"
    ),
  meta: {
    requiresAuth: true,
    breadCrumb: "Proyectos",
  },
  children: [
    {
      path: "",
      name: "dashboard-projects-list",
      component: () =>
        import(
          /* webpackChunkName: "dashboard-projects-list" */ "@/components/projects/ProjectsList.vue"
        ),
    },
    {
      path: "create",
      name: "dashboard-projects-create",
      component: () =>
        import(
          /* webpackChunkName: "dashboard-projects-create" */ "@/components/projects/ProjectForm.vue"
        ),
      meta: {
        requiresAuth: true,
        breadCrumb: "Crear proyecto",
      },
    },
    {
      path: "edit/:id",
      name: "dashboard-projects-edit",
      props: true,
      component: () =>
        import(
          /* webpackChunkName: "dashboard-projects-edit" */ "@/components/projects/ProjectForm.vue"
        ),
      meta: {
        requiresAuth: true,
        breadCrumb: "Editar proyecto",
        dinamicRoute: true,
      },
    },
  ],
};

export default route;
