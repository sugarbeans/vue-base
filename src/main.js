import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import "@/assets/style/index.less";
import './http'
import store from "./store/index";
import moment from 'moment'

import "@/components/Vant";
// rem
import "amfe-flexible";
Vue.config.productionTip = false;
Vue.prototype.$moment = moment
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
