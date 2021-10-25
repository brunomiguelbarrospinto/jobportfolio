import { RouteRecordRaw } from "vue-router";

const route: RouteRecordRaw = {
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
  children: [
    {
      path: "",
      name: "dashboard-social-networks-list",
      component: () =>
        import(
          /* webpackChunkName: "dashboard-social-networks-list" */ "@/components/social-networks/SocialNetworksList.vue"
        ),
    },
    {
      path: "create",
      name: "dashboard-social-networks-create",
      component: () =>
        import(
          /* webpackChunkName: "dashboard-social-networks-create" */ "@/components/social-networks/SocialNetworkForm.vue"
        ),
      meta: {
        requiresAuth: true,
        breadCrumb: "Añadir red social",
      },
    },
    {
      path: "edit/:id",
      name: "dashboard-social-networks-edit",
      props: true,
      component: () =>
        import(
          /* webpackChunkName: "dashboard-social-networks-edit" */ "@/components/social-networks/SocialNetworkForm.vue"
        ),
      meta: {
        requiresAuth: true,
        breadCrumb: "Editar red social",
        dinamicRoute: true,
      },
    },
  ],
};

export default route;
