<template>
  <v-app>
    <v-toolbar extended app>
      <!-- <img src="img/logo.png" style="height: 26px;"> -->

      <v-text-field
        prepend-inner-icon="search"
        class="mx-3"
        hide-details
        flat
        solo
        v-model="search"
        clearable
        color="#F5F5F5"
        placeholder="Search Campus"
        @keyup="trackSearch(search)"
        @click:clear="searchClear()"
      ></v-text-field>


      <!-- filter chips -->
      <v-container
        slot="extension"
        fluid
        class="px-0 ma-0 chip-container"
        v-touch="{
          left: () => noSwipe(),
          right: () => noSwipe(),
        }"
      >
        <div class="scroll-container">
          <div class="text-md-center chip-content px-2">
            <span class="mr-2">Filter by: </span>
            <v-chip
              :key="tag"
              :class="{ 'active': tagFilter.indexOf(tag) > -1 }"
              v-for="tag in peopleTags"
              @click="switchTag(tag)"
            >
              {{ tag }}
            </v-chip>
          </div>
        </div>
      </v-container>
    </v-toolbar>

    <v-content>
      <v-tabs-items v-model="tabs">
        <v-tab-item id="tabs-people">
          <People :search="search" :filter="tagFilter"></People>
        </v-tab-item>
        <v-tab-item id="tabs-startup">
          <Startup :search="search"></Startup>
        </v-tab-item>
      </v-tabs-items>

      <v-footer>
        <span>
          Made with ❤ in
          <a href="https://www.campus.co/madrid/">
            Google for Startups Campus
          </a>.
        </span>
        <span>
          Feedback? Something to say?
          <a href="mailto:hola@codingcarlos.com" target="_blank">
            Tell us!
          </a>
        </span>
      </v-footer>
    </v-content>

    <v-bottom-nav
      :active.sync="tabs"
      :value="true"
      fixed
    >
      <v-btn
        flat
        value="tabs-people"
      >
        <span>People</span>
        <v-icon>person</v-icon>
      </v-btn>

      <v-btn
        text="#f00"
        flat
        value="tabs-startup"
      >
        <span>Startups</span>
        <v-icon>group</v-icon>
      </v-btn>

    </v-bottom-nav>

    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <router-view name="dialog"></router-view>
    </v-dialog>

<!--     <a href="https://docs.google.com/forms/d/e/1FAIpQLScaem-y35W3AJeuUAeviZEkqecG98fDOBQErBw0UzJqKsa06g/viewform" target="_blank">
      <v-btn
        fab
        fixed
        bottom
        right
        color="primary"
      >
        <v-icon>person_add</v-icon>
      </v-btn>
    </a> -->

  </v-app>
</template>


<style scoped>

.v-bottom-nav {
    box-shadow: none;
    border-top: 1px solid #DFE1E5;
}

/* - Remove grey color in bottom nav when pressed */
.v-btn--active:before, .v-btn:focus:before, .v-btn:hover:before {
     background-color: transparent;
}
/* - Remove padding in chips*/
.v-toolbar__content, .v-toolbar__extension {
  padding: 0;
}
/* --- */

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
  background-color: #FFF;
  box-shadow: none;
  border-bottom: 1px solid #efefef;
}

a {
  text-decoration: none;
}

.v-chip {
  /* background: dark-gray; */
  background: #FFFFFF;
  border: 1px solid #DFE1E5;
  color: #3c3c3c;
  font-weight: 500;
}
  .v-chip:focus {
    box-shadow: none;
  }

  .v-chip.active {
    background-color: #d48ded;
    border-color: #d48ded;
    color: #fff;
  }

/*.chip-container {
  margin-top: 32px;
}
*/
.application.theme--light {
  background: #FFFFFF;
}

.v-toolbar__extension {
  margin-bottom: -1px;
}

.theme--light .v-text-field--solo .v-input__slot {
  background: #0000000f;
  border-radius: 50px;
}

.v-text-field.v-text-field--solo .v-input__control {
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.chip-content {
  text-align: center;
}

/* bigger-chips-mobile */
@media only screen and (max-width: 768px) {
  .v-text-field.v-text-field--solo .v-input__control {
    min-height: 36px;
  }

  .scroll-container {
    overflow-x: scroll;
    width: 100%;
  }
    .scroll-container::-webkit-scrollbar {
      background: transparent;
      width: 0;
    }

  .chip-content {
    display: flex;
    align-items: center;
    text-align: left;
    width: 750px;
  }
}

/* fixes footer text clickability */
@media (max-width: 959px) {
  .v-footer {
    height: auto !important;
    padding: 16px 0px;
    box-sizing: border-box;
    padding-bottom: 80px !important;
  }

  footer span {
    padding: 8px;
  }

/*  .chip-container {
    margin-top: 24px !important;
  }*/
}

@media (min-width: 959px) {
  footer {
    flex-direction: row !important;
  }

  footer span {
    display: inline-block;
    margin: 0 2px;
  }
}
</style>

<style>

.v-btn--active {
    color: #d48ded !important;
}

.v-input--is-focused .v-input__slot {
    box-shadow: 0px 4px 24px 8px rgba(0,0,0,0.1);
}

.no-underline {
  text-decoration: none;
}

.v-toolbar__content {
    height: 64px !important;
}

.v-input__slot {
    border-radius: 50px;
    border: 1px solid #dfe1e5;
}

.v-input__icon i {
    color: #717171 !important;
}

.v-text-field .v-input__prepend-inner {
    padding-right: 8px;
}

</style>


<script>
import People from '../components/People.vue';
import Startup from '../components/Startup.vue';

function checkChildren(name) {
  const childrenRoutes = ['personDetail', 'startupDetail'];
  if (childrenRoutes.indexOf(name) > -1) {
    this.dialog = true;
  } else {
    this.dialog = false;
  }
}

function searchOpen() {
  this.searching = true;
  this.$ga.event('search', 'search_open');
}

function searchClose() {
  this.searching = false;
  this.$ga.event('search', 'search_back');
}

function searchClear() {
  this.$ga.event('search', 'search_clear');
}

function trackSearch(search) {
  this.$ga.event('search', 'search_type', search);
}

function switchTag(name) {
  const index = this.tagFilter.indexOf(name);
  if (index === -1) {
    this.tagFilter.push(name);
    this.$ga.event('list_people', 'filter_add', name);
  } else {
    this.tagFilter.splice(index, 1);
    this.$ga.event('list_people', 'filter_remove', name);
  }
}

export default {
  name: 'Tabs',
  components: {
    People,
    Startup,
  },
  data: () => ({
    title: 'Campus Directory',
    searching: false,
    tabs: 'tabs-people',
    search: '',
    tagFilter: [],
    peopleTags: [
      'Tech', 'Design', 'UX', 'Product', 'Operations', 'Business', 'Marketing', 'Mentor',
    ],
    switchTag,
    dialog: false,
    tabClicked: null,
    checkChildren,
    searchOpen,
    searchClose,
    searchClear,
    trackSearch,
  }),
  methods: {
    deferPrompt: () => {
      if (window.deferredPrompt !== undefined) {
        // let's show the prompt.
        window.deferredPrompt.prompt();
        window.deferredPrompt.userChoice.then((choiceResult) => {
          console.log(choiceResult.outcome);
          /* eslint-disable no-console */
          if (choiceResult.outcome === 'dismissed') {
            console.log('User cancelled home screen install');
          } else {
            console.log('User added to home screen');
          }
          /* eslint-enable no-console */
          // We no longer need the prompt. Clear it up.
          window.deferredPrompt = null;
        });
      }
    },
    noSwipe: () => {
      // eslint-disable-next-line
      event.stopPropagation();
    },
  },

  created() {
    this.checkChildren(this.$router.currentRoute.name);
    this.deferPrompt();
  },

  watch: {
    $route(to) {
      this.checkChildren(to.name);
    },
    tabs(to) {
      console.log(this.tabs);
      // Clean tab name
      const tab = to.replace('tabs-', '');

      // Detect swipe or click
      let method = 'default';
      if (this.tabClicked === true) {
        this.tabClicked = false;
        method = 'click';
      } else if (this.tabClicked === false) {
        method = 'swipe';
      }

      // Event emmit
      this.$ga.event('directory_navigation', `tab_${tab}`, method);
    },
  },
};
</script>
