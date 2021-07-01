export default [
  {
    path: "/orders",
    name: "orders",
    component: () =>
      import(/* webpackChunkName: "Orders" */ "@/components/Orders.vue"),
  },
];
