/* eslint-disable */ 
// import * as firebase from 'firebase/app';
// import 'firebase/messaging'
import firebase from './firebase';

workbox.core.setCacheNameDetails({ prefix: 'd4' });

// Change this value every time before you build
const LATEST_VERSION = 'v1.24.2';

self.addEventListener('activate', activateServiceWorker);

workbox.skipWaiting();
workbox.clientsClaim();

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

/* Execute on SW activation */
function activateServiceWorker(event) => {
  return self.registrarion.showNotification("Todo funcionando", {
    body: 'Podemos usar estas cosas',
    icon: 'public/assets/logo.png',
  });
  console.log('serviceworker activated!');
  checkCache(LATEST_VERSION);
  initPushMessages();
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
  const messaging = firebase.messaging();

  messaging.onMessage(messageHandler);
  messaging.onBackgroundMessage(messageHandler)
  messaging.setBackgroundMessageHandler(messageHandler);
}

/**
 *  Handle a new push message
 */
function messageHandler(payload) {
    alert(1);
    console.log('YAY! New notification arived!');
    console.log(payload);
    const title = payload.data.username;

    const options = {
      body: payload.data.message,
      icon: 'public/assets/logo.png',
    };

    return self.registrarion.showNotification(title, options);
  }