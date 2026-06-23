import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/posts",
    name: "posts",
    component: () => import("../views/JokesPage.vue"),
  },
  {
    path: "/form",
    name: "form",
    component: () => import("../views/FormPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
