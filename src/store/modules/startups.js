import axios from 'axios';
import api from '@/store/helpers/api';

// Functions
function getById(state, id) {
  return state.list.find(item => item.id === id);
}
function getIndexById(state, id) {
  for (let i = 0; i < state.list.length; i += 1) {
    if (state.list[i].id === id) {
      return i;
    }
  }

  return -1;
}

// Inital state
const initialState = {
  loading: false,
  list: [],
};

// Getters
const getters = {
  getById: state => id => getById(state, id),
};

// Actions
const actions = {
  getStartups({ commit }) {
    commit('loadStart')

    axios.get(`${api.url}/group`)
      .then((response) => {
        commit('setStartups', response.data || []);
      })
      .catch((e) => {
        console.error('Error getting people list');
        console.error(e);
      })
      .finally(() => {
        commit('loadEnd')
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
  setStartups(state, list) {
    state.list = list;
  },
  updateStartup(state, startup) {
    const index = getIndexById(state, startup.id);
    if (index > -1) {
      const keys = Object.keys(startup);
      for (var i = 0; i < keys.length; i++) {
        const key = keys[i];
        state.list[index][key] = startup[key];
      }

      return state.list[index];
    }
    return state.list.push(startup);
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
