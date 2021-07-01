export default [
  {
    path: "/team",
    name: "team",
    component: () =>
      import(/* webpackChunkName: "team" */ "@/components/pages/Team.vue"),
  },
];
