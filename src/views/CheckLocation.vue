<template>
<v-app class="theme--dark">
  <v-layout column justify-center v-if="disallowed">
    <div class="text-xs-center big-icon">
      <v-icon>location_off</v-icon>
    </div>

    <h1 class="text-xs-center welcome-text">
      Sorry, but you need to grant location access or be at the Campus.
    </h1>

    <p class="text-xs-center explain-text">
      For privacy reasons, this beta is only accesible from the Campus.<br />
      Enable your location to access the Directory.
    </p>

    <div class="text-xs-center">
      <v-btn large @click="getLocation(); dialog = true">Enable location</v-btn>
    </div>
  </v-layout>

  <v-layout column justify-center v-else>

    <div class="text-xs-center big-icon">
      <v-icon>location_on</v-icon>
    </div>

    <h1 class="text-xs-center welcome-text">Welcome to Campus Directory</h1>

    <p class="text-xs-center explain-text">
      For privacy reasons, this beta is only accesible from the Campus.<br />
      Enable your location to access the Directory.
    </p>

    <div class="text-xs-center">
      <v-btn large @click="getLocation(); dialog = true">Enable location</v-btn>
    </div>
  </v-layout>

  <v-dialog v-model="dialog" fullscreen>
    <div class="dialog-fullscreen-wrapper">
      <loading></loading>
      <p class="display-1">Patience is a virtue</p>
    </div>
  </v-dialog>
</v-app>

</template>

<style type="text/css" scoped>
.welcome-text {
  font-family: Roboto;
  font-size: 40px;
  padding: 0px 24px;
}

.big-icon i {
  font-size: 82px;
  margin: 12px 0;
}

.explain-text {
  font-family: Roboto;
  margin: 8px 12vw 32px;
  font-size: 18px;
}

.v-btn {
  background: #CD85E8 !important;
  border-radius: 50px;
  text-transform: none;
}

.dialog-fullscreen-wrapper {
  height: 100%;
  background: rgba(48, 48, 48, 0.96);
  padding-top: 40vh;
}

.display-1 {
  text-align: center;
  padding: 24px;
}

.v-progress-circular {
  height: 40px;
  width: 40px;
}
</style>

<script type="text/javascript">
import Loading from '../components/Loading.vue';

// If you want to make it persistent throught sessions, you can use localStorage
const storage = window.localStorage;

function askForLocation(callback) {
  // check for Geolocation support
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(callback, callback);
  } else {
    console.error('Geolocation is not supported for this Browser/OS.');

    // Track the error, and take the user out
    this.$ga.event('onboarding', 'location_error');
    this.dialog = false;
    this.disallowed = true;
  }
}

function isLocationValid(lat, long) {
  return fetch(`${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_API_LOCATION}?lat=${lat}&long=${long}`, {
    method: 'GET',
    // body:JSON.stringify({title:"a new todo"})
  }).then(res => res.json())
    // .then((data) => {
    //   return data;
    // })
    .catch((err) => {
      console.error(err);
    });
}

function checkEnter() {
  const allow = storage.getItem('access_allowed');
  const token = storage.getItem('token');
  const needAuth = process.env.VUE_APP_NEED_AUTH === 'true';

  if (!needAuth || (allow === 'true' && token !== null)) {
    this.$router.push({ name: 'home' });
  } else if (allow !== null) {
    this.disallowed = true;
  }
}

function getLocation() {
  this.$ga.event('onboarding', 'location_request');
  askForLocation((data) => {
    // In case of error...
    if (!data || data.code) {
      this.$ga.event('onboarding', 'location_denied');
      this.dialog = false;
      this.disallowed = true;
      return false;
    }

    this.$ga.event('onboarding', 'location_granted');

    return isLocationValid(data.coords.latitude, data.coords.longitude)
      .then((serverResponse) => {
        this.dialog = false;
        storage.setItem('access_allowed', serverResponse.allow);
        storage.setItem('access_distance', serverResponse.distance);

        if (serverResponse.token) {
          storage.setItem('token', serverResponse.token);
        } else storage.setItem('token', 'FAKETOKENHERE');

        return this.checkEnter();
      });
  });
}


export default {
  name: 'Tabs',

  data: () => ({
    disallowed: false,
    dialog: false,
    getLocation,
    checkEnter,
  }),

  components: {
    Loading,
  },

  created() {
    this.checkEnter();
  },
};
</script>
