<template>
  <router-view></router-view>
</template>

<script>
import People from './views/People.vue';
import Startup from './views/Startup.vue';

export default {
  name: 'App',
  data() {
    return {
      fixed: false,
      title: 'Campus directory',
      tabs: null,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    };
  },
  components: {
    People,
    Startup,
  },
};
</script>
