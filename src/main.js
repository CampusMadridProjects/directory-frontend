import '@babel/polyfill';
import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import head from 'vue-head';

import helpers from './plugins/helpers';
import './plugins/vuetify';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import config from './config.js';

window.addEventListener('beforeinstallprompt', (event) => {
  // Commented, becouse we will enable this in the future
  // event.preventDefault();
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;
  return false;
});

Vue.use(head);
Vue.use(helpers);

config()
  .then(conf => {
    Vue.use(VueAnalytics, {
      id: conf.analyticsID,
      router,
    });
  });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
