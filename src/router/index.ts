import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import DashboardRoutes from "./dashboard/index";
import ProfileRoutes from "./profile/index";
import Home from "../views/Home.vue";
import { useFirebase } from "@/composables/useFirebase";
const { currentAuthUser } = useFirebase();

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
  },
  ...DashboardRoutes,
  ...ProfileRoutes,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
  },
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isPublic = to.matched.some((record) => record.meta.isPublic);
  if (requiresAuth && !currentAuthUser.value) next("/login");
  else if (!requiresAuth && currentAuthUser.value && !isPublic)
    next("/dashboard");
  else next();
});

export default router;
