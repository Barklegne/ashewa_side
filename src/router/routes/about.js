export default [
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "About" */ "@/components/pages/About.vue"),
  },
];
