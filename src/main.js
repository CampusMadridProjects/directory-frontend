import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: process.env.ANALYTICS_TRACKING_ID,
  router,
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
