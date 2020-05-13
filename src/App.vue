<template>
  <router-view></router-view>
</template>

<style>
  body.gfs,
  body.gfs .application,
  body.gfs .display-1,
  body.gfs .headline,
  body.gfs .application {
    font-family: 'Google Sans' !important;
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
        self.title = {
          complement: "A new sun",
        };
        this.$emit('updateHead');
      });
  },
};
</script>
