import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  createWebHashHistory,
} from "vue-router";
import DashboardRoutes from "./dashboard/index";
import ProfileRoutes from "./profile/index";
import BlogRoutes from "./blog/index";
import { useFirebase } from "@/composables/useFirebase";
const { currentAuthUser } = useFirebase();
import { IS_STAGING } from "@/config";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    redirect: { name: "login" },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
  },
  ...DashboardRoutes,
  ...ProfileRoutes,
  ...BlogRoutes,
  {
    path: "/test",
    name: "test",
    component: () => import(/* webpackChunkName: "login" */ "@/views/Test.vue"),
    meta: { isPublic: true },
  },
];

const router = createRouter({
  history: IS_STAGING
    ? createWebHashHistory()
    : createWebHistory(process.env.BASE_URL),
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
