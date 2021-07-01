export default [
  {
    path: "/sellOnAshewa",
    name: "SellOnAshewa",
    component: () =>
      import(
        /* webpackChunkName: "SellOnAshewa" */ "@/components/pages/SellOnAshewa.vue"
      ),
  },
];
