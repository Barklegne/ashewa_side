export default [
  {
    path: "/",
    name: "landing",
    component: () =>
      import(
        /* webpackChunkName: "landing" */ "@/components/pages/Landing.vue"
      ),
  },
];
