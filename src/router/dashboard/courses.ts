import { RouteRecordRaw } from "vue-router";

const route: RouteRecordRaw = {
  path: "courses",
  name: "dashboard-courses",
  component: () =>
    import(
      /* webpackChunkName: "dashboard-courses" */ "@/views/dashboard/views/Courses.vue"
    ),
  meta: {
    requiresAuth: true,
    breadCrumb: "Courses",
  },
  children: [
    {
      path: "",
      name: "dashboard-courses-list",
      component: () =>
        import(
          /* webpackChunkName: "dashboard-courses-list" */ "@/components/courses/CoursesList.vue"
        ),
    },
    {
      path: "create",
      name: "dashboard-courses-create",
      component: () =>
        import(
          /* webpackChunkName: "dashboard-courses-create" */ "@/components/courses/CoursesForm.vue"
        ),
      meta: {
        requiresAuth: true,
        breadCrumb: "New",
      },
    },
    {
      path: "edit/:id",
      name: "dashboard-courses-edit",
      props: true,
      component: () =>
        import(
          /* webpackChunkName: "dashboard-courses-edit" */ "@/components/courses/CoursesForm.vue"
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
