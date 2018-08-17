<template>
  <v-app dark>
    <v-toolbar tabs extended app dark>
      <img src="img/logo.png" style="height: 26px;">
      <!-- Navbar title -->
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- Navbar actions -->
      <v-btn icon @click="searching = true">
        <v-icon>search</v-icon>
      </v-btn>

      <!-- Navbar Tabs -->
      <v-tabs
        slot="extension"
        v-model="tabs"
        fixed-tabs
        color="transparent"
      >
        <v-tabs-slider></v-tabs-slider>
        <v-tab href="#tabs-people">
          People
        </v-tab>

        <v-tab href="#tabs-startup">
          Startups
        </v-tab>

        <v-tab href="#tabs-organizations">
          Organizations
        </v-tab>
      </v-tabs>

      <!-- Search navbar -->
      <div v-if="searching">
        <v-toolbar absolute flat dark>
          <v-btn icon @click="searching = false">
            <v-icon>arrow_back</v-icon>
          </v-btn>

          <v-text-field
            hide-details
            single-line
            v-model="search"
            autofocus
            clearable
            placeholder="Search for people, startups or organizations"
          ></v-text-field>
        </v-toolbar>
      </div>

    </v-toolbar>

    <v-content>
      <v-tabs-items v-model="tabs">
        <v-tab-item id="tabs-people">
          <People :search="search"></People>
        </v-tab-item>
        <v-tab-item id="tabs-startup">
          <Startup :search="search"></Startup>
        </v-tab-item>
        <v-tab-item id="tabs-organizations">
          <Organizations :search="search"></Organizations>
        </v-tab-item>
      </v-tabs-items>
    </v-content>

    <v-footer >
      <span>2018 - Made with ❤ in <a>Campus Madrid</a></span>
    </v-footer>
  </v-app>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*  .v-toolbar__title:not(:first-child) {
    margin-left: 0;
  }*/
  .v-tabs__items,
  .v-tabs__content {
    min-height: 100%;
  }

  footer {
    align-items: center;
    justify-content: center;
  }
</style>

<script>
import People from '../components/People.vue';
import Startup from '../components/Startup.vue';
import Organizations from '../components/Organizations.vue';

export default {
  name: 'Tabs',
  data() {
    return {
      fixed: false,
      title: 'Campus Directory',
      searching: false,
      tabs: null,
      search: '',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    };
  },
  components: {
    People,
    Startup,
    Organizations,
  },
};
</script>
