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

    axios.get(`${api.url}/faq`)
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
  addQuestion({ commit }, newQuestion) {
    commit('loadStart');

    return axios.post(`${api.url}/faq`, newQuestion)
      .then((response) => {
        commit('addQuestion', response.data || null);
      })
      .catch((e) => {
        console.error('Error getting people list');
        console.error(e);
      })
      .finally(() => {
        commit('loadEnd');
      });
  },
  remove({ commit }, question) {
    commit('loadStart');

    return axios.delete(`${api.url}/faq/${question}`)
      .then((response) => {
        commit('removeQuestion', question || null);
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
  addQuestion(state, question) {
    if (!question) return false;

    for (var i = 0; i < state.list.length; i++) {
      if (state.list[i].id === question.id) {
        return state.list[i] = question;
      }
    }

    return state.list.push(question);
  },
  removeQuestion(state, question) {
    if (!question) return false;

    for (var i = 0; i < state.list.length; i++) {
      if (state.list[i].id === question) {
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
