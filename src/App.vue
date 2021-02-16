<template>
  <div>
    <router-view></router-view>
  </div>
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
  },
};
</script>
