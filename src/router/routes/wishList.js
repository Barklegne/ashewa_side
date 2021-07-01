export default [
  {
    path: "/wishList",
    name: "whishList",
    component: () =>
      import(
        /* webpackChunkName: "WishList" */ "@/components/pages/Wishlist.vue"
      ),
  },
];
