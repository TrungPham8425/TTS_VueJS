import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/Home.vue";
import NotesView from "@/views/Notes.vue";
import NoteDetailView from "@/views/NoteDetail.vue";

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/notes",
    name: "NotesView",
    component: NotesView,
  },
  {
    path: "/note/:id",
    name: "NoteDetailView",
    component: NoteDetailView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
