import axios from 'axios';
import api from '@/store/helpers/api';

// Inital state
const initialState = {
  loading: false,
  modules: [],
  slack: {},
};

// Getters
const getters = {
  slackWorkspace(state) {
    if (!state.slack) return '';
    return state.slack.slackWorkspace || '';
  },
};

// Actions
const actions = {
  getConfig({ commit }) {
    commit('loadStart');

    return axios.get(`${api.url}/config`)
      .then((response) => {
        commit('setConfig', response.data || []);
      })
      .catch((e) => {
        console.error('Error getting config info');
        console.error(e);
      })
      .finally(() => {
        commit('loadEnd');
      });
  },
};

// Mutations
const mutations = {
  loadStart(state) {
    state.loading = true;
  },
  loadEnd(state) {
    state.loading = false;
  },
  setConfig(state, config) {
    state.modules = config.modules;
    state.slack = config.slack;
  },
};

// Export store
export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
