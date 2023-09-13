import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PlayerView from "@/views/PlayerView.vue";
import HostView from "@/views/HostView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/host",
    name: "host",
    component: HostView,
  },
  {
    path: "/player",
    name: "player",
    component: PlayerView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
