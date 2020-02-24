<template>
  <router-view></router-view>
</template>

<style>
  html, body, .application {
    font-family: 'Google Sans';
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
