import Vue from 'vue';
import Vuex from 'vuex';

import people from './modules/people';
import settings from './modules/settings';
import startups from './modules/startups';
import tags from './modules/tags';
import config from './modules/config';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    people,
    settings,
    startups,
    tags,
    config,
  },
});
