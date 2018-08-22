import Vue from 'vue';
import Router from 'vue-router';
import CheckLocation from './views/CheckLocation.vue';
import Tabs from './views/Tabs.vue';
import PersonDetail from './views/PersonDetail.vue';
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
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          name: 'personDetail',
          path: 'person/:id',
          component: PersonDetail
        },
        // {
        //   // UserPosts will be rendered inside User's <router-view>
        //   // when /user/:id/posts is matched
        //   path: 'startup/:id',
        //   component: UserPosts
        // }
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
  ],
});
