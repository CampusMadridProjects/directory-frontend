import '@babel/polyfill';
import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';

console.log(process.env);

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;
  return false;
});

Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_ANALYTICS_TRACKING_ID,
  router,
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
