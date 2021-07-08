import Vue from "vue";
import vuetify from "@/plugins/vuetify";
import "@/plugins/common";
import "@/plugins/veevalidate";
import App from "@/App.vue";
import router from "@/router";
import { store } from "@/store";
import VuetifyConfirm from "vuetify-confirm";
import { createProvider } from "./vue-apollo";
import ZoomOnHover from "vue-zoom-on-hover";


Vue.use(ZoomOnHover);
Vue.config.productionTip = false;
Vue.use(VuetifyConfirm, { vuetify });

const app = new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
  apolloProvider: createProvider(),

  created() {
    if (store.getters.isTokenSet) {
      store.dispatch("autoLogin");
    }
  },
}).$mount("#app");

if (window.Cypress) {
  // Only available during E2E tests
  window.app = app;
}
