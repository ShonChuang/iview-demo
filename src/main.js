// import iView from 'iview';
import Vue from 'vue';
import VueRouter from 'vue-router';
import 'iview/dist/styles/iview.css';
// import locale from 'iview/dist/locale/zh-TW';
import App from './App.vue';
import routes from './router/routers';
import global_ from './global/Global';

Vue.config.productionTip = false;
// Vue.use(iView, { locale });
Vue.use(VueRouter);
Vue.prototype.GLOBAL = global_;
const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
