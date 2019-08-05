import axios from 'axios';
import api from '@/store/helpers/api';

// Functions
function getById(state, id) {
  return state.list.find(item => item.id === id);
}
function getArrayIndexById(array, id) {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i].id === id) {
      return i;
    }
  }

  return -1;
}
function getIndexById(state, id) {
  return getArrayIndexById(state.list, id);
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
  getPeople({ commit }) {
    commit('loadStart');

    axios.get(`${api.url}/person`)
      .then((response) => {
        commit('setPeople', response.data || []);
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
  setPeople(state, list) {
    state.list = list;
  },
  updatePerson(state, person) {
    const index = getIndexById(state, person.id);
    if (index > -1) {
      const keys = Object.keys(person);
      for (var i = 0; i < keys.length; i++) {
        const key = keys[i];
        state.list[index][key] = person[key];
      }

      return state.list[index];
    }
    return state.list.push(person);
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
