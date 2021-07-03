export default [
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "About" */ "@/components/pages/About.vue"),
  },
  {
    path: "/vendor-supplier",
    name: "VendorSupplier",
    component: () =>
      import(
        /* webpackChunkName: "AboutV" */ "@/components/pages/VendorSupplier.vue"
      ),
  },
  {
    path: "/ashewa-army",
    name: "AshewaArmy",
    component: () =>
      import(
        /* webpackChunkName: "AboutA" */ "@/components/pages/AshewaArmy.vue"
      ),
  },
  {
    path: "/shipping-policy",
    name: "ShippingPolicy",
    component: () =>
      import(
        /* webpackChunkName: "AboutS" */ "@/components/pages/ShippingPolicy.vue"
      ),
  },
  {
    path: "/privacy-policy",
    name: "PrivacyPolicy",
    component: () =>
      import(/* webpackChunkName: "AboutP" */ "@/components/pages/Policy.vue"),
  },
];
