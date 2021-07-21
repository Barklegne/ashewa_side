export default [
  {
    path: "/search/:id",
    name: "Search",
    component: () =>
      import(/* webpackChunkName: "Search" */ "@/components/pages/Search.vue"),
  },
];
