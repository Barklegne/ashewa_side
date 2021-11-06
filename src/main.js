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
// import Tawk from "vue-tawk";
import i18n from "@/plugins/i18n";
import "./registerServiceWorker";
import VueGtag from "vue-gtag"; //instantiate gtag events
import { longClickDirective } from "vue-long-click";

Vue.use(VueGtag, {
  //use gtag inside each components to trigger actions
  config: { id: "UA-207369427-1" }, //connect gtag events with MEASUREMENT_ID(FROM GOOGLE ANALYTICS DASHBOARD)
});

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
  i18n,
  render: (h) => h(App),
  apolloProvider: createProvider(),

  created() {
    store.dispatch("autoLogin");
  },
}).$mount("#app");
const longClickInstance = longClickDirective({ delay: 400, interval: 50 });

Vue.directive("longclick", longClickInstance);

// Vue.use(Tawk, {
//   tawkSrc: "https://embed.tawk.to/60f08fb1649e0a0a5ccc6b78/1falr2jms",
// });

if (window.Cypress) {
  // Only available during E2E tests
  window.app = app;
}
