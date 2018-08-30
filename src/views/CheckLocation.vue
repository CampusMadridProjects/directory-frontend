<template>
<v-app class="theme--dark">
  <v-layout column justify-center v-if="disallowed">
    
    
    <div class="text-xs-center big-icon">
      <v-icon>location_off</v-icon>
    </div>
    
     <h1 class="text-xs-center welcome-text">Sorry, but you need to grant location access or be at the Campus.</h1>

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

  <v-dialog v-model="dialog">
    <v-card>

      <v-card-text>
       <loading></loading>
      </v-card-text>

      <v-card-title class="headline">Patience is a virtue</v-card-title>
    </v-card>
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
</style>

<script type="text/javascript">
import Loading from '../components/Loading.vue';

// If you want to make it persistent throught sessions, you can use localStorage
const storage = window.sessionStorage;

function askForLocation(callback) {
  // check for Geolocation support
  if (navigator.geolocation) {
    console.log('Geolocation is supported!');
    navigator.geolocation.getCurrentPosition(callback);
  } else {
    console.log('Geolocation is not supported for this Browser/OS.');
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

function checkEnter(data) {
  const allow = storage.getItem('access_allowed');
  // const distance = storage.getItem('access_distance');

  if (allow === 'true') {
    this.$router.push({name: 'home'});
  } else if (allow !== null) {
    this.disallowed = true;
  }
}

function getLocation() {
  askForLocation((data) => {
    console.log(data);
    isLocationValid(data.coords.latitude, data.coords.longitude)
      .then((data) => {
        this.dialog = false;
        storage.setItem('access_allowed', data.allow);
        storage.setItem('access_distance', data.distance);

        return this.checkEnter();
      });
  });
}


export default {
  name: 'Tabs',
  data() {
    return {
      disallowed: false,
      dialog: false,
      getLocation,
      checkEnter,
    };
  },
  components: {
    Loading,
  },
  created() {
    this.checkEnter();
  },
};
</script>
