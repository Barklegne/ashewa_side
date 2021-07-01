export default [
  {
    path: "/category/:id",
    name: "singleCategory",
    component: () =>
      import(
        /* webpackChunkName: "Category" */ "@/components/pages/Category.vue"
      ),
  },
  {
    path: "/allCategories",
    name: "AllCategories",
    component: () =>
      import(
        /* webpackChunkName: "AllCategories" */ "@/components/pages/AllCategories.vue"
      ),
  },
  {
    path: "/subcategory/:id",
    name: "subCategory",
    component: () =>
      import(
        /* webpackChunkName: "SubCategory" */ "@/components/pages/SubCategory.vue"
      ),
  },
];
