import Vue from 'vue';
import Router from 'vue-router';
import Tabs from './views/Tabs.vue';
import About from './views/About.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Tabs,
      // component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
  ],
});
