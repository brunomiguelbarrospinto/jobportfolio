export default {
  path: "/dashboard",
  name: "dashboard",
  component: () =>
    import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue"),
  meta: {
    requiresAuth: true,
  },
};
