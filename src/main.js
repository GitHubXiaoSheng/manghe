import Vue from 'vue'
import VueRouter from 'vue-router';
import Navigation from 'vue-navigation';

import { Toast } from 'antd-mobile'

import App from './App.vue'

import router from './router/index.js'
import store from './store/index.js'
import axios from './util/http.js'

Vue.config.productionTip = false
Vue.prototype.$http = Vue.http = axios;
Vue.prototype.post = window.post = axios.post;
Vue.prototype.get = window.get = axios.get;
Vue.prototype.showToast = window.showToast = Toast.show;


// const app = Vue.createApp(App)
// app.use(routes)
// app.use(store)
// app.mount('#app')
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
