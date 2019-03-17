import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import wordUtils from "./lib/word-utils";

Vue.config.productionTip = false;
Vue.mixin(wordUtils);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
