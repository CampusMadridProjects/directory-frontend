import axios from 'axios';
import api from '@/store/helpers/api';
import firebase from '@/firebase';

const messaging = firebase.messaging();

messaging.onMessage((payload) => {
  let title = '¡News from the Directory!';
  let msg = 'Check out the news of your space';
  
  console.log('New message in foreground:');
  console.log(payload);

  if (payload.data && payload.data.title) {
    title = payload.data.title;
  }
  if (payload.data && payload.data.body) {
    msg = payload.data.body;
  }

  customServiceWorker.showNotification(`${title}`, {
    body: msg,
    icon: '/img/icons/logo.png',
  });
});

// Inital state
const initialState = {
  loading: false,
};

const getters = {};

// Actions
const actions = {
  async subscribe({ commit }) {
    commit('loadStart');

    try {
      await messaging.requestPermission()
      const customServiceWorker = await navigator.serviceWorker.getRegistration();
      const token = await messaging.getToken({
        serviceWorkerRegistration: customServiceWorker,
      });

      await axios.post(`${api.url}/push/subscribe`, {
        token,
      });

      window.localStorage.removeItem('pushDisabled');
    } catch(error) {
      if (error.code === 'messaging/permission-blocked') {
        console.log('Please Unblock Notification Request Manually');
      } else {
        console.log('Error Occurred', error);
      }
    }  
  
    commit('loadEnd');
  },
  async unsubscribe({ commit }) {
    commit('loadStart');

    try {
      await messaging.requestPermission();
      const customServiceWorker = await navigator.serviceWorker.getRegistration();
      const token = await messaging.getToken({
        serviceWorkerRegistration: customServiceWorker,
      });

      await axios.post(`${api.url}/push/unsubscribe`, {
        token,
      });
      
      window.localStorage.setItem('pushDisabled', true);
    } catch(error) {
      if (error.code === 'messaging/permission-blocked') {
        console.log('Please Unblock Notification Request Manually');
      } else {
        console.log('Error Occurred', error);
      }
    }  
  
    commit('loadEnd');
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
