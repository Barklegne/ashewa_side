export default [
  {
    path: "/messages",
    name: "Messages",
    component: () => import("@/components/pages/Messages.vue"),
  },
  {
    path: "/messages/:id",
    name: "SingleMessages",
    component: () => import("@/components/pages/SingleMessage.vue"),
  },
];
