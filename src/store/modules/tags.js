import axios from 'axios';
import api from '@/store/helpers/api';

// Inital state
const initialState = {
  loading: false,
  list: [],
};

// Getters
const getters = {
  getById: state => id => state.list.find(item => item.id === id),
  getByTarget: state => target => {
    console.log(target);
    return state.list.filter(item => (item.for && item.for.indexOf(target) > -1));
  }
};

// Actions
const actions = {
  getTags({ commit }) {
    commit('loadStart');

    axios.get(`${api.url}/tag`)
      .then((response) => {
        commit('setTags', response.data || []);
      })
      .catch((e) => {
        console.error('Error getting tag list');
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
  setTags(state, list) {
    state.list = list;
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
