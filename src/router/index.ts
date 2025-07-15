import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import ChatLayout from "../views/ChatLayout.vue";
import ChatRoom from "../views/ChatRoom.vue";
import { useAuthStore } from "../stores/authStore";

const requireAuth = () => {
  const auth = useAuthStore();
  return auth.isLoggedIn ? true : "/login";
};

const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/",
    name: "ChatLayout",
    component: ChatLayout,
    beforeEnter: requireAuth,
    children: [
      {
        path: "chat/:roomId",
        name: "ChatRoom",
        component: ChatRoom,
        props: true,
        beforeEnter: requireAuth,
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
