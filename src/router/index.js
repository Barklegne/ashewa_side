import Vue from "vue";
import Router from "vue-router";
import Meta from "vue-meta";
import routes from "@/router/routes";

Vue.use(Router);
Vue.use(Meta);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [...routes],
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  return next();
});

export default router;
