import axios from 'axios';
import api from '@/store/helpers/api';

// Inital state
const state = {
  loading: false,
  list: [],
};

// Getters
const getters = {
  getById: state => id => state.list.find(item => item.id === id),
};

// Actions
const actions = {
  getTags({ commit }) {
    state.loading = true;

    axios.get(`${api.url}/tag`)
      .then((response) => {
        commit('setTags', response.data || []);
      })
      .catch((e) => {
        console.error('Error getting people list');
        console.error(e);
      })
      .finally(() => {
        state.loading = false;
      });
  },
};

// Mutations
const mutations = {
  setTags(state, list) {
    state.list = list;
  },
};

// Export store
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
