export default [
  {
    path: "/ProductDetails/:id",
    name: "ProductDetails",
    component: () =>
      import(
        /* webpackChunkName: "ProductDetails" */ "@/components/pages/ProductDetail.vue"
      ),
  },
  {
    path: "/NewArrivals",
    name: "NewArrivals",
    component: () =>
      import(
        /* webpackChunkName: "ProductDetails" */ "@/components/pages/NewArrivals.vue"
      ),
  },
  {
    path: "/BestProducts",
    name: "BestProducts",
    component: () =>
      import(
        /* webpackChunkName: "ProductDetails" */ "@/components/pages/BestProducts.vue"
      ),
  },
];
