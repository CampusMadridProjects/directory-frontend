<template>
  <div class="cookies-notice custom-elevation" v-if="!cookiesAccepted">
    <div class="mr-1">
      To discover how to make a better product for you, we use third party cookies.
      <a class="cookies-read" @click="$emit('read')">Read cookie policy</a>.
    </div>

    <v-btn depressed color="white" @click="acceptCookies()" class="ml-4">
      <span data-t>Accept</span>
    </v-btn>
  </div>
</template>

<style scoped>

  .cookies-notice {
    align-items: center;
    background: #4285f4;
    bottom: 16px;
    color: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 24px;
    position: fixed;
    z-index: 999;
    font-size: 1.2rem;
    border-radius: 4px;
    align-self: center;
  }

  .gfs .cookies-notice {
    font-family: 'Google Sans';
  }
  .cookies-notice .cookies-read {
    text-decoration: underline;
    color: #fff;
  }

  @media only screen and (max-width: 959px) {
    .cookies-notice {
      flex-direction: column;
      margin: 16px;
      left: 0px;
      margin-bottom: env(safe-area-inset-bottom) !important;
    }
    .cookies-notice .v-btn {
      width: 100%;
      margin-top: 16px;
      margin-left: 0px !important;
      margin-right: 0px !important;
      margin-bottom: 0px;
      min-height: 48px;
    }
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
