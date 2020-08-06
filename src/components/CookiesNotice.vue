<template>
  <div class="cookies-notice" v-if="!cookiesAccepted">
    <div>
      Hi! To discover how to make a better product for you, we use third party cookies.
      <a href="https://communitytools.co/cookies.html" target="_blank" class="cookies-read">
        Read cookie policy
      </a>.
    </div>

    <v-btn @click="acceptCookies()">
      <span data-t>It's ok</span>
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
  font-family: 'Roboto', sans-serif;
  justify-content: space-between;
  left: 0px;
  padding: 24px;
  position: fixed;
  width: 100%;
  z-index: 999;
}

  .cookies-notice .cookies-read {
    text-decoration: underline;
    color: #fff;
  }

@media screen and (max-width: 960px) {
  .cookies-notice {
    bottom: 56px;
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
