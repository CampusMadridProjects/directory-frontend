import Vue from 'vue';
import Vuex from 'vuex';

import agency from './modules/agency';
import config from './modules/config';
import faq from './modules/faq';
import mail from './modules/mail';
import news from './modules/news';
import people from './modules/people';
import push from './modules/push';
import settings from './modules/settings';
import startups from './modules/startups';
import tags from './modules/tags';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    agency,
    config,
    faq,
    mail,
    news,
    people,
    push,
    settings,
    startups,
    tags,
  },
});
