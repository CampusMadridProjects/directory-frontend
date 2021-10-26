/* eslint-disable */ 
importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-messaging.js');

workbox.core.setCacheNameDetails({ prefix: 'd4' });

// Change this value every time before you build
const LATEST_VERSION = 'v1.27.1';

// Configure firebase
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

// Listen to push messages only once
initPushMessages();

self.addEventListener('activate', activateServiceWorker);

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    // clients.openWindow(event.notification.data.link + "?notification_id=" + event.notification.data.id)
    clients.openWindow(event.notification.data.link + '?ref=notification')
  );
});

workbox.skipWaiting();
workbox.clientsClaim();

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

/* Execute on SW activation */
function activateServiceWorker(event) {  
  console.log('[service-worker.js] service worker activated!', LATEST_VERSION);
  checkCache(LATEST_VERSION);
}

/**
 *  Ensure that latest version is always shown
 *  @param version {String} Current version
 */
function checkCache(version) {
  console.log(`%c ${version} `, 'background: #ddd; color: #0000ff');
  if (caches) {
    caches.keys().then((arr) => {
      arr.forEach((key) => {
        if (key.indexOf('d4-precache') < -1) {
          caches.delete(key).then(() => console.log(`%c Cleared ${key}`, 'background: #333; color: #ff0000'));
        } else {
          caches.open(key).then((cache) => {
            cache.match('version').then((res) => {
              if (!res) {
                cache.put('version', new Response(version, { status: 200, statusText: version }));
              } else if (res.statusText !== version) {
                caches.delete(key).then(() => console.log(`%c Cleared Cache ${version}`, 'background: #333; color: #ff0000'));
              } else console.log(`%c Great you have the latest version ${version}`, 'background: #333; color: #00ff00');
            });
          });
        }
      });
    });
  }
}

/**
 *  Initialize push notifications SW
 */
function initPushMessages() {
  if (firebase.messaging.isSupported()) {
    const messaging = firebase.messaging();
    messaging.onBackgroundMessage(messageHandler);
    console.log('[service-worker.js] Push notifications initialized!');
  } else {
    console.log('[service-worker.js] Push messaging not supported');
  }
}

/**
 *  Handle a new push message
 */
function messageHandler(payload) {
  console.log('YAY! New notification arived!');
  console.log(payload);
  const title = (payload.data && payload.data.title) || 'Directory';

  const options = {
    body: payload.data.body,
    icon: 'https://challengd-app.web.app/img/icons/logo.png',
    // icon: '/img/icons/logo.png',
    data: {
      url: payload.data.link,
    },
  };

  console.log(options);

  return self.registration.showNotification(title, options);
}
