// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import Vuetify from "vuetify";
import "@mdi/font/css/materialdesignicons.css";
import axios from "axios";
import store from "./store";
import i18n from "./i18n";

Vue.config.productionTip = false;
Vue.use(vuetify);
Vue.prototype.$http = axios;
Vue.prototype.baseUrl = `http://${location.hostname}:3000`;
Vue.prototype.formatNumber = num => {
  return num ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") : '';
};

/* eslint-disable no-new */
new Vue({
  el: "#app",
  i18n,
  router,
  store,
  vuetify: new Vuetify(),
  components: { App },
  template: "<App/>"
});

export default new Vuetify({
  icons: {
    iconfont: "mdi" // default - only for display purposes
  }
});
