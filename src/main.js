import '@babel/polyfill';
import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';

console.log(process.env);

Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_ANALYTICS_TRACKING_ID,
  router,
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
