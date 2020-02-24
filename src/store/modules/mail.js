import axios from 'axios';
import api from '@/store/helpers/api';

// Inital state
const initialState = {
  loading: false,
};

const getters = {};

// Actions
const actions = {
  send({ commit }, emailData) {
    commit('loadStart');

    return axios.post(`${api.url}/email/connect`, emailData)
      .catch((e) => {
        console.error('Error connecting though email');
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
};

// Export store
export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
