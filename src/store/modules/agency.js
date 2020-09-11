import axios from 'axios';
import api from '@/store/helpers/api';

// Inital state
const initialState = {
  loading: false,
};

const getters = {};

// Actions
const actions = {
  send({ commit }, data) {
    commit('loadStart');
    const id = data.id || null;
    if (!id) return Promise.reject(new Error('Invalid id to connect'));

    return axios.post(`${api.url}/agency/connect/${id}`, data)
      .catch((e) => {
        console.error('Error connecting to agency');
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
