import { RouteRecordRaw } from "vue-router";

const route: RouteRecordRaw = {
  path: "knowledge",
  name: "dashboard-knowledge",
  component: () =>
    import(
      /* webpackChunkName: "dashboard-knowledge" */ "@/views/dashboard/views/Knowledge.vue"
    ),
  meta: {
    requiresAuth: true,
    breadCrumb: "Knowledge",
  },
  children: [
    {
      path: "",
      name: "dashboard-knowledge-list",
      component: () =>
        import(
          /* webpackChunkName: "dashboard-knowledge-list" */ "@/components/knowledge/KnowledgeList.vue"
        ),
    },
    {
      path: "create",
      name: "dashboard-knowledge-create",
      component: () =>
        import(
          /* webpackChunkName: "dashboard-knowledge-create" */ "@/components/knowledge/KnowledgeForm.vue"
        ),
      meta: {
        requiresAuth: true,
        breadCrumb: "Create",
      },
    },
    {
      path: "edit/:id",
      name: "dashboard-knowledge-edit",
      props: true,
      component: () =>
        import(
          /* webpackChunkName: "dashboard-knowledge-edit" */ "@/components/knowledge/KnowledgeForm.vue"
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
