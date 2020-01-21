<template>
  <router-view></router-view>
</template>

<style>
  html, body, .application {
    font-family: 'Google Sans';
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
