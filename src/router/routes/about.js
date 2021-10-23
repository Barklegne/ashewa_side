export default [
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "About" */ "@/components/pages/About.vue"),
  },
  {
    path: "/services",
    name: "Services",
    component: () =>
      import(
        /* webpackChunkName: "Services" */ "@/components/pages/Services.vue"
      ),
  },
  {
    path: "/suppliers",
    name: "Suppliers",
    component: () =>
      import(
        /* webpackChunkName: "Suppliers" */ "@/components/pages/Suppliers.vue"
      ),
  },
  {
    path: "/retailers",
    name: "Retailers",
    component: () =>
      import(
        /* webpackChunkName: "Retailers" */ "@/components/pages/Retailers.vue"
      ),
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
  {
    path: "/sell-on-products-on-ashewa",
    name: "SellOnAshewaBusiness",
    component: () =>
      import(
        /* webpackChunkName: "AboutPB" */ "@/components/pages/SellOnAshewaBusiness.vue"
      ),
  },
  {
    path: "/sell-on-ashewa-business",
    name: "SellProductOnAshewa",
    component: () =>
      import(
        /* webpackChunkName: "AboutPOA" */ "@/components/pages/SellProductOnAshewa.vue"
      ),
  },
  {
    path: "/become-an-affiliate",
    name: "BecomeAnAffiliate",
    component: () =>
      import(
        /* webpackChunkName: "AboutBA" */ "@/components/pages/BecomeAnAffiliate.vue"
      ),
  },
  {
    path: "/comingSoon",
    name: "ComingSoon",
    component: () =>
      import(
        /* webpackChunkName: "AboutBA" */ "@/components/pages/ComingSoon.vue"
      ),
  },
  {
    path: "/whyus",
    name: "WhyUS",
    component: () =>
      import(/* webpackChunkName: "AboutBA" */ "@/components/pages/WhyUs.vue"),
  },
  {
    path: "/productFeatures",
    name: "ProductFeatures",
    component: () =>
      import(/* webpackChunkName: "AboutBA" */ "@/components/pages/ProductFeatures.vue"),
  },
];
