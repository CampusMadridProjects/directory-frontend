import '@babel/polyfill';
import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

window.addEventListener('beforeinstallprompt', (event) => {
  // Commented, becouse we will enable this in the future
  // event.preventDefault();
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
  store,
  render: h => h(App),
}).$mount('#app');
