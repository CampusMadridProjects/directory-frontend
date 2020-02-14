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
};

// Actions
const actions = {
  get({ commit }) {
    commit('loadStart');

    axios.get(`${api.url}/news`)
      .then((response) => {
        commit('setFaq', response.data || []);
      })
      .catch((e) => {
        console.error('Error getting people list');
        console.error(e);
      })
      .finally(() => {
        commit('loadEnd');
      });
  },
  add({ commit }, newPost) {
    commit('loadStart');

    return axios.post(`${api.url}/news`, newPost)
      .then((response) => {
        commit('addPost', response.data || null);
      })
      .catch((e) => {
        console.error('Error getting people list');
        console.error(e);
      })
      .finally(() => {
        commit('loadEnd');
      });
  },
  remove({ commit }, id) {
    commit('loadStart');

    return axios.delete(`${api.url}/news/${id}`)
      .then((response) => {
        commit('removePost', id || null);
      })
      .catch((e) => {
        console.error('Error getting people list');
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
  setFaq(state, list) {
    state.list = list;
  },
  addPost(state, post) {
    if (!post) return false;

    for (var i = 0; i < state.list.length; i++) {
      if (state.list[i].id === post.id) {
        return state.list[i] = post;
      }
    }

    return state.list.push(post);
  },
  removePost(state, id) {
    if (!id) return false;

    for (var i = 0; i < state.list.length; i++) {
      if (state.list[i].id === id) {
        return state.list.splice(i, 1);
      }
    }
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
