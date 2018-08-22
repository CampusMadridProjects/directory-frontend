import Vue from 'vue';
import Router from 'vue-router';
import CheckLocation from './views/CheckLocation.vue';
import Tabs from './views/Tabs.vue';
import About from './views/About.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'location',
      component: CheckLocation,
    },
    {
      path: '/directory',
      name: 'home',
      component: Tabs,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
  ],
});
