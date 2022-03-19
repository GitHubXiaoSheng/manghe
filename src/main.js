import Vue from 'vue'
import VueRouter from 'vue-router';
import Navigation from 'vue-navigation';

import App from './App.vue'

import router from './router/index.js'
import store from './store/index.js'

Vue.config.productionTip = false
// const app = Vue.createApp(App)
// app.use(routes)
// app.use(store)
// app.mount('#app')
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
