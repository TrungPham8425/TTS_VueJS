import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Projects from "@/views/Projects.vue";
import ProjectDetail from "@/views/ProjectDetail.vue";
import ProjectForm from "@/views/ProjectForm.vue";
import Tasks from "@/views/Tasks.vue";

// Hàm kiểm tra đăng nhập
function isAuthenticated() {
  return localStorage.getItem("isAuthenticated") === "true";
}

// Hàm lấy role
function getRole() {
  return localStorage.getItem("role");
}

const routes = [
  // link đăng nhập
  {
    path: "/",
    name: "login",
    component: Login,
  },
  // link danh sách dự án
  {
    path: "/projects",
    name: "projects",
    component: Projects,
  },
  // link thêm mới dự án
  {
    path: "/projects/new",
    name: "project-new",
    component: ProjectForm,
    beforeEnter: (to, from, next) => {
      if (getRole() === "admin") {
        next();
      } else {
        alert("Access denied. Admin only.");
        next("/projects");
      }
    },
  },
  // link chi tiết dự án
  {
    path: "/projects/:id",
    name: "project-detail",
    component: ProjectDetail,
    props: true,
    children: [
      {
        path: "tasks",
        name: "project-tasks",
        component: Tasks,
        props: true,
      },
      {
        path: "edit",
        name: "project-edit",
        component: ProjectForm,
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard global kiểm tra đăng nhập
router.beforeEach((to, from, next) => {
  // Các route cần đăng nhập, trừ trang login
  const publicPages = ["/"];
  const authRequired = !publicPages.includes(to.path);
  if (authRequired && !isAuthenticated()) {
    return next("/");
  }
  next();
});

export default router;
