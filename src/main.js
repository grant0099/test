import "babel-polyfill";
import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";
import VueAxios from "vue-axios";
import VueCookies from "vue-cookies";
// import HighchartsVue from "highcharts-vue";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import HighchartsVue from "highcharts-vue";

Vue.use(HighchartsVue);
Vue.use(VueSweetalert2);
// Vue.use(HighchartsVue);
Vue.use(VueCookies);
Vue.use(VueAxios, axios);
// 安裝 BootstrapVue
Vue.use(BootstrapVue);

Vue.config.productionTip = false;
Vue.config.ignoredElements = ["ion-icon"];

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
