export default [
  {
    path: "/termsOfUse",
    name: "termsOfUse",
    component: () =>
      import(
        /* webpackChunkName: "termsOfUse" */ "@/components/pages/TermsOfUse.vue"
      ),
  },
];
