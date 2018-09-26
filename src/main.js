import iView from 'iview';
import Vue from 'vue';
import VueRouter from 'vue-router';
import 'iview/dist/styles/iview.css';
import App from './App.vue';
import routes from './router/routers';

Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(VueRouter);
const router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
