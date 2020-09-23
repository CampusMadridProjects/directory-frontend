import axios from 'axios';
import api from '@/store/helpers/api';
// import objectToFormData from '@/store/helpers/objectToFormData';

// Inital state
const initialState = {
  loading: false,
  loaded: false,
  config: {
    showPeople: false,
    showStartups: false,
    showMore: false,
  },
  list: [],
};

// Getters
const getters = {
  // getById: state => id => getById(state, id),
};

// Actions
const actions = {
  getConfig({ commit }) {
    commit('loadStart');

    return axios.get(`${api.url}/config`)
      .then((response) => {
        commit('setConfig', response.data || {});
      })
      .catch((e) => {
        console.error('Error getting config');
        console.error(e);
      })
      .finally(() => {
        commit('loadEnd');
      });
  },
  setConfig({ commit, dispatch }, data) {
    commit('loadStart');

    return axios.post(`${api.url}/config`, data)
      .then(() => dispatch('getConfig'))
      .catch((e) => {
        console.error('Error setting config');
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
  setConfig(state, data) {
    state.config = data;
    state.loaded = true;
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
