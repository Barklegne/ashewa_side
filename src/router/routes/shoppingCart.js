export default [
  {
    path: "/cart",
    name: "ShoppingCart",
    component: () =>
      import(
        /* webpackChunkName: "ShoppingCart" */ "@/components/pages/Cart.vue"
      ),
  },
];
