<template>
  <v-app>
    <router-view></router-view>

    <v-snackbar
      v-model="updateModal"
      color="black"
      :timeout="0"
    >
      A new version is available
      <v-btn
        color="primary"
        flat
        @click="refresh()"
      >
        Update
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<style>
  body.gfs,
  body.gfs .application,
  body.gfs .display-1,
  body.gfs .headline,
  body.gfs .application {
    font-family: 'Google Sans' !important;
  }

  h1 {
    line-height: 1.2;
    font-size: 36px;
  }

  .subtitle {
    /* font-size: 22px !important; */
    font-size: 18px !important;
    line-height: 1.3;
    color: rgb(117, 117, 117);
    /* font-weight: 500; */
  }

  .light-border {
    border: 1px solid #eaeaea !important;
  }

  /* more spread, low contrast */
  .custom-elevation {
    box-shadow: 0 4px 24px 12px rgba(0,0,0,.16) !important;
  }

  .custom-hover:hover {
    box-shadow: 0 4px 8px 0px rgba(0,0,0,.10) !important;
  }

  @media only screen and (max-width: 959px) {
      .subtitle {
        font-size: 18px !important;
        line-height: 24px;
      }
  }

  /* sets card container size for screen sizes between ipad and desktop */
  @media only screen and (min-width: 960px) and (max-width: 1263px) {
    .container {
      max-width: 1124px;
    }
  }

  /* removes card container max width in bigger screen sizes */
  @media only screen and (min-width: 1440px) {
    .container {
      max-width: none !important;
      padding: 24px 2%;
    }
  }

/* iOS bottom navigation fix */
.v-bottom-nav, .v-item-group.v-bottom-nav .v-btn, .layout .v-btn--floating {
  height: auto !important;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
.ios-safe {
  margin-bottom: env(safe-area-inset-bottom) !important;
  height: 56px;
  bottom: 64px !important;
}

</style>

<script>
// ToDo @CodingCarlos: Make this dynamic
// Set GFS class to GFS instances
const gfsDomain = 'gfs.directory';
if (window.location.hostname.indexOf(gfsDomain) !== -1) {
  document.body.className += ' gfs'
}

export default {
  name: 'App',
  async beforeCreate() {
    await this.$store.dispatch('settings/getConfig');
  },
  head: {
    title() {
      let title = this.$store.state.config.config.title || '';
      return {
        inner: 'Home',
        complement: title,
      };
    },
  },
  data: () => ({
    updateModal: false,
  }),
  methods: {
    showAppUpdateUI() {
      this.updateModal = true;
    },
    refresh() {
      this.updateModal = false;
      window.location.reload(true);
    },
  },
  created() {
    let self = this;
    this.$store.dispatch('config/getConfig')
      .then(a => {
        let title = this.$store.state.config.config.title || '';
        self.title = {
          complement: title,
        };
        this.$emit('updateHead');
      });

    document.addEventListener('serviceWorkerUpdateEvent', this.showAppUpdateUI, { once: true });
  },
};
</script>
