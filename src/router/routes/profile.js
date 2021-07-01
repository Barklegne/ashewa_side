export default [
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(
        /* webpackChunkName: "Profile" */ "@/components/pages/Profile.vue"
      ),
  },
];
