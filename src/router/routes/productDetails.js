export default [
  {
    path: "/ProductDetails/:id",
    name: "ProductDetails",
    component: () =>
      import(
        /* webpackChunkName: "ProductDetails" */ "@/components/pages/ProductDetail.vue"
      ),
  },
];
