<template>
  <div class="cookies-notice" v-if="!cookiesAccepted">
    <div class="mr-1">
      To discover how to make a better product for you, we use third party cookies.
      <a class="cookies-read" @click="$emit('read')">Read cookie policy</a>.
    </div>

    <v-btn depressed color="white" @click="acceptCookies()">
      <span data-t>Accept</span>
    </v-btn>
  </div>
</template>

<style scoped>
  .cookies-notice {
    align-items: center;
    background: #4285f4;
    bottom: 0px;
    color: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    left: 0px;
    padding: 24px;
    position: fixed;
    width: 100%;
    z-index: 999;
    font-size: 1.2rem;
  }
  .gfs .cookies-notice {
    font-family: 'Google Sans';
  }
  .cookies-notice .cookies-read {
    text-decoration: underline;
    color: #fff;
  }
</style>

<script>
export default {
  name: 'CookiesNotice',
  data: () => ({
    cookiesAccepted: true,
  }),
  methods: {
    acceptCookies() {
      window.localStorage.setItem('cookiesAccepted', new Date());
      this.cookiesAccepted = true;
    }
  },
  created() {
    this.cookiesAccepted = !!window.localStorage.getItem('cookiesAccepted');
  }
};
</script>
