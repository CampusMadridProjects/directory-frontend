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

import config from './config';

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
  .then((conf) => {
    const id = [];

    // Config analytics ID
    if (conf.analyticsID) {
      id.push(conf.analyticsID);
    }

    // Global analytics ID
    if (process.env.VUE_APP_ANALYTICS_ID) {
      id.push(process.env.VUE_APP_ANALYTICS_ID);
    }

    Vue.use(VueAnalytics, {
      id,
      router,
    });
  });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
