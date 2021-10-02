export default [
  {
    path: "/suppliers/:id",
    name: "SupplierDetails",
    component: () =>
      import(
        /* webpackChunkName: "SupplierDetails" */ "@/components/pages/SupplierDetail.vue"
      ),
  },
  {
    path: "/vendors/:id",
    name: "VendorDetails",
    component: () =>
      import(
        /* webpackChunkName: "VendorDetails" */ "@/components/pages/VendorDetail.vue"
      ),
  },
];
