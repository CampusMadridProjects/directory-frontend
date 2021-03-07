import firebase from 'firebase/app';
// import 'firebase/auth';
import 'firebase/messaging'

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  // authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.onMessage((payload) => {
  console.log('Message received. ', payload);
});

export default firebase;
