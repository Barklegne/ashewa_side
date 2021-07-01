export default [
  {
    path: "/policy",
    name: "policy",
    component: () =>
      import(
        /* webpackChunkName: "GeneralPolicy" */ "@/components/pages/GeneralPolicy.vue"
      ),
  },
];
