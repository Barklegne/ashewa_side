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
import Tawk from "vue-tawk";
import './registerServiceWorker'

// this.$Tawk.$updateChatUser({
//   name: "alehegn",
//   email: "alehegntefera@gmail.com",
//   hash: "",
// });

//this.$Tawk.$endChat()

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

Vue.use(Tawk, {
  tawkSrc: "https://embed.tawk.to/60f08fb1649e0a0a5ccc6b78/1falr2jms",
});

if (window.Cypress) {
  // Only available during E2E tests
  window.app = app;
}
