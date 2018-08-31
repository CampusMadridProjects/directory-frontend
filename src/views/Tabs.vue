<template>
  <v-app>
    <v-toolbar tabs extended app>
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
        <v-toolbar absolute flat>
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
            <v-container fluid class="pa-0 chip-container">
                <div class="text-xs-center">
                    <v-chip :class="{ 'active': tagFilter.indexOf(tag) > -1 }" v-for="tag in peopleTags" @click="switchTag(tag)">{{ tag }}</v-chip>
                </div>
            </v-container>
          <People :search="search" :filter="tagFilter"></People>
        </v-tab-item>
        <v-tab-item id="tabs-startup">
          <Startup :search="search"></Startup>
        </v-tab-item>
        <v-tab-item id="tabs-organizations">
          <Organizations :search="search"></Organizations>
        </v-tab-item>
      </v-tabs-items>
    </v-content>

    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <router-view></router-view>
    </v-dialog>

    <v-footer>
      <span>
        Made with ❤ in <a href="https://www.campus.co/madrid/">Campus Madrid</a>. New data? Something to update? <a href="https://docs.google.com/forms/d/e/1FAIpQLScaem-y35W3AJeuUAeviZEkqecG98fDOBQErBw0UzJqKsa06g/viewform" target="_blank">Tell us!</a>
      </span>
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
    
    .v-tabs__div {
        text-transform: none;
    }

  footer {
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    padding: 24px 0;
  }
    
    .v-toolbar {
        background-color: rgba(245, 245, 245, 0.99);
        box-shadow: none;
        border-bottom: 1px solid #efefef;
    }
    
    a {
        text-decoration: none;
    }
    
  .v-chip {
    /* background: dark-gray; */
    background: #eae8e8;
    color: #3c3c3c;
    font-weight: 500;
  }

  .v-chip.active {
    background-color: #82b1ff;
    color: #fff;
  }
  
  .chip-container {
    margin-top: 32px;
  }
</style>

<script>
import People from '../components/People.vue';
import Startup from '../components/Startup.vue';
import Organizations from '../components/Organizations.vue';

function checkChildren(name) {
  const childrenRoutes = ['personDetail', 'startupDetail'];
  if (childrenRoutes.indexOf(name) > -1) {
    this.dialog = true;
  } else {
    this.dialog = false;
  }
}

function switchTag(name) {
  const index = this.tagFilter.indexOf(name);
  if (index === -1) {
    this.tagFilter.push(name);
  } else {
    this.tagFilter.splice(index, 1);
  }
}

export default {
  name: 'Tabs',
  data() {
    return {
      title: 'Campus Directory',
      searching: false,
      tabs: null,
      search: '',
      tagFilter: [],
      peopleTags: [
        'Tech', 'UI', 'UX', 'Product', 'Operations', 'Business', 'Marketing', 'Mentor'
      ],
      switchTag,
      dialog: false,
      checkChildren,
    };
  },
  components: {
    People,
    Startup,
    Organizations,
  },
  created() {
    this.checkChildren(this.$router.currentRoute.name);
  },
  watch: {
    $route(to, from) {
      this.checkChildren(to.name);
    },
  },
};
</script>
