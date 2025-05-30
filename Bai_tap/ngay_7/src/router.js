// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

// Import các component
import HomePage from "./views/Home.vue";
import PostsPage from "./views/Posts.vue";
import PostDetail from "./views/PostDetail.vue";

// Khởi tạo router với các route
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: HomePage,
    },
    {
      path: "/posts",
      name: "PostsPage",
      component: PostsPage,
    },
    {
      path: "/posts/:id",
      name: "PostDetail",
      component: PostDetail,
    },
  ],
});

export default router;
