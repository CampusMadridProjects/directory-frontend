import Vue from 'vue';
import Vuex from 'vuex';

import people from './modules/people';
import startups from './modules/startups';
import tags from './modules/tags';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    people,
    startups,
    tags,
  },
});
