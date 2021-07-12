<template>
  <div v-if="showBanner">
    <v-card class="pt-3 mt-2 light-border primary200 text-center home-banner">
      <v-img
        src="https://blush.design/api/download?shareUri=M_b1ebPIc&w=800&h=800&fm=png"
        max-height="164"
        aspect-ratio="2.75"
        contain
      ></v-img>

      <v-card-title primary-title class="px-3 pb-0 pt-2 justify-center">
        <div>
          <h3 class="headline mb-1">Never miss an update</h3>
          <div class="subheading">Turn on push notifications to receive occasional updates from your community, right from your browser</div>
        </div>
      </v-card-title>

      <v-card-actions class="pa-3">
        <v-btn
          depressed
          large
          color="white"
          style="width: 49%;"
          @click="showLater = true"
        >
          Maybe later
        </v-btn>
        <v-btn
          depressed
          large
          color="primary"
          style="width: 49%;"
          @click="enablePushNotifications()"
        >
          <span v-if="!isLoading">
            Subscribe
          </span>
          <span v-else class="d-flex align-center">
            <!-- Subscribing... -->
            <loading class="mx-2" size="21" />
          </span>
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-divider class="my-4"></v-divider>
  </div>
</template>

<script>
  import firebase from '@/firebase';
  import Loading from '@/components/Loading.vue';

  export default {
    name: 'PushBanner',
    components: {
      Loading,
    },
    data: () => ({
      showLater: false,
    }),
    computed: {
      config() {
        return this.$store.state.config.config || {};
      },
      isLoading() {
        return this.$store.state.push.loading
      },
      showBanner() {
        let shouldShow = true;

        if (this.showLater) {
          shouldShow = false;
        }

        if (this.config.pushEnabled !== true) {
          shouldShow = false;
        }

        if (!firebase.messaging.isSupported()) {
          console.log('La mensajería no está sopotada en este dispositivo');
          shouldShow = false;
        }

        if (window.Notification && window.Notification.permission !== 'default') {
          shouldShow = false;
        }

        if (window.localStorage && !!window.localStorage.getItem('pushDisabled')) {
          shouldShow = true;
        }

        return shouldShow;
      },
    },
    methods: {
      enablePushNotifications() {
        if (!firebase.messaging.isSupported()) {
          console.log('La mensajería no está sopotada en este dispositivo');
          this.showLater = true;
          return false;
        }

        this.$store.dispatch('push/subscribe')
          .then(() => {
            console.log('Done!');
            this.showLater = true;
          });
      },
    },
  };

  /**
   */
  function initializeFirebase() {
    if (!firebase.messaging.isSupported()) {
      console.log('La mensajería no está sopotada en este dispositivo');
      return false;
    }
    
    const messaging = firebase.messaging();

    console.log('Requesting push permission...');
    messaging.requestPermission().then(async () => {
      console.log("Permission granted!");
      const customServiceWorker = await navigator.serviceWorker.getRegistration();

      // This don't go here, this is 100% temporal.
      messaging.onMessage((payload) => {
        let title = '¡News from the Directory!';
        let msg = 'Check out the news of your space';
        
        console.log('New message in foreground:');
        console.log(payload);

        if (payload.data && !payload.data.body) {
          if (payload.data.body.title) {
            title = payload.data.body.title;
          }
          if (payload.data.body.message) {
            msg = payload.data.body.message;
          }
        }

        customServiceWorker.showNotification(`${title}`, {
          body: msg,
          icon: '/img/icons/logo.png',
        });
      })

      setTimeout(() => {
        customServiceWorker.showNotification('This is a test', {
          body: 'If you can see this, it means that we can send you push notifications. Congrats!',
          icon: '/img/icons/logo.png',
        });
      }, 2000);

      return messaging.getToken({
        serviceWorkerRegistration: customServiceWorker,
      });
    })
    .then(token => {
      console.log("AY MAMA");
      console.log(token);
      // var userType = 'group';
      // var UID = process.env.VUE_APP_COMMETCHAT_GUID;
      // var appId = process.env.VUE_APP_COMMETCHAT_APP_ID;
      // var topic = appId + '_' + userType + '_' + UID;
      // var url = `https://ext-push-notifications.cometchat.com/fcmtokens/${token}/topics/${topic}`;
      // fetch(url, {
      //   method: 'POST',
      //   headers: new Headers({
      //     'Content-Type': 'application/json',
      //   }),
      //   body: JSON.stringify({appId: appId}),
      // })
      //   .then(response => {
      //     if (response.status < 200 || response.status >= 400) {
      //       console.log(
      //         'Error subscribing to topic: ' +
      //           response.status +
      //           ' - ' +
      //           response.text()
      //       );
      //     }
        // })
        // .catch(error => {
        //   console.error(error);
        // });
    })
    .catch(error => {
      if (error.code === 'messaging/permission-blocked') {
        console.log('Please Unblock Notification Request Manually');
      } else {
        console.log('Error Occurred', error);
      }
    });  
  }
</script>
