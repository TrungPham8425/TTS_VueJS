import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Tasks from "../views/Tasks.vue";
import TaskDetail from "../views/TaskDetail.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: Tasks,
  },
  {
    path: "/tasks/:id",
    name: "TaskDetail",
    component: TaskDetail,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
