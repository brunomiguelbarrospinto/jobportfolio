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
  ],
};

export default route;
