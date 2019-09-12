<template>
  <v-app>
    <v-toolbar extended app>
       <img src="img/logo.png" style="height: 21px;padding-right: 16px;"> 

      <v-text-field
        prepend-inner-icon="search"
        hide-details
        flat
        solo
        v-model="search"
        clearable
        color="#F5F5F5"
        placeholder="Try RatedPower, Andrea or UX"
        @keyup="trackSearch(search)"
        @click:clear="searchClear()"
      ></v-text-field>

        <v-btn color="primary">
            <v-icon left>add</v-icon>Add Profile
        </v-btn>

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
          <div class="text-md-center chip-content px-4">
            <span class="mr-2 d-sm-none d-lg-flex">Filter by: </span>
            <v-chip
              v-for="tag in $store.state.tags.list"
              :key="tag.id"
              :class="{ 'active': tagFilter.indexOf(tag.name) > -1 }"
              @click="switchTag(tag.name)"
            >
              {{ tag.name }}
            </v-chip>
          </div>
        </div>
      </v-container>
    </v-toolbar>

    <v-content>
      <v-tabs-items v-model="tabs">
        <v-tab-item value="tabs-people">
          <People :search="search" :filter="tagFilter"></People>
        </v-tab-item>
        <v-tab-item value="tabs-startup">
          <Startup :search="search"></Startup>
        </v-tab-item>
        <v-tab-item value="tabs-more">
            <More></More>
        </v-tab-item>
      </v-tabs-items>
    </v-content>

    <v-bottom-nav
      class="desktop-horizontal"
      :active.sync="tabs"
      :value="true"
      fixed
    >
      <v-btn
        flat
        value="tabs-people"
      >
        <!-- <span>People</span> -->
        <v-icon>person</v-icon>
      </v-btn>

      <v-btn
        flat
        value="tabs-startup"
      >
        <!-- <span>Startups</span> -->
        <v-icon>group</v-icon>
      </v-btn>
      
      <v-btn
        flat
        value="tabs-more"
      >
        <!-- <span>Startups</span> -->
        <v-icon>menu</v-icon>
      </v-btn>

    </v-bottom-nav>

    <v-dialog v-model="dialog" transition="dialog-bottom-transition" persistent>
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
    
.v-input__slot {
    background: #e0e0e0;
}

.v-bottom-nav {
    box-shadow: none;
    border-top: 1px solid #DFE1E5;
}
    .v-bottom-nav .v-btn:hover {
        background: transparent !important;
    }

/* - Remove grey color in bottom nav when pressed */
.v-btn--active:before, .v-btn:focus:before, .v-btn:hover:before {
     background-color: transparent;
}
/* - Remove padding in chips*/
>>> .v-toolbar__extension {
  padding: 0 !important;
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
}

a {
  text-decoration: none;
}

.v-chip {
  background: #FFFFFF;
  border: 1px solid #DFE1E5;
  color: #3c3c3c;
  font-weight: 500;
}
  .v-chip:focus {
    box-shadow: none;
  }

  .v-chip.active {
    background-color: rgba(66, 133, 244, 0.16);
    border-color: #4285F4;
    color: #4285F4;
  }
    
>>> .v-chip.active:focus .v-chip__content {
    background: #e3e8fd;
}

>>> .v-chip:focus .v-chip__content {
    background: #fff;
}

.application.theme--light {
  background: #ffffff;
}

.v-toolbar__extension {
  margin-bottom: -1px;
}

.theme--light .v-text-field--solo .v-input__slot {
  background: #e0e0e0;
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

>>> .v-dialog {
  background: #FFFFFF;
  border-radius: 0;
  margin: 0;
  height: 100%;
  max-height: 100%;
  position: fixed;
  overflow-y: auto;
  top: 0;
  right: 0;
  left: auto;
  width: 360px;
}

/* bigger-chips-mobile */
@media only screen and (max-width: 768px) {

  >>> .v-dialog {
    width: 100%;
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

    .v-toolbar .v-btn {
        display: none;
    }
    
    .v-toolbar img {
        display: none;
    }
    
    /* this native vuetify class should be hiding the element in mobile, but its not working for no reasong, so i'm adding it here for the moment */
    .d-sm-none {
        display: none;
    }
    
/*  .chip-container {
    margin-top: 24px !important;
  }*/
}

@media (min-width: 959px) {
    
.v-item-group.v-bottom-nav .v-btn--active {
    background: rgba(66, 133, 244, 0.16) !important;
    border-radius: 0px 50px 50px 0px;
}

  >>> .v-item-group.v-bottom-nav .v-btn--active .v-btn__content {
    min-height: auto;
  }

  .desktop-horizontal[style] {
    flex-direction: column;
    height: calc(100% - 64px) !important; 
    left: 0;
    position: fixed;
    top: 64px;
    justify-content: flex-start;
    width: 116px !important;
  }
    
    .v-item-group.v-bottom-nav .v-btn {
        max-height: 56px;
        padding: 16px 0px;
        border-radius: 0px 50px 50px 0px;
    }
    
    /* removes borde from vertical nav */
    .v-bottom-nav {
        border: none;
    }

  >>> .v-window__container {
    margin-left: 94px !important;
  }

  footer {
    flex-direction: row !important;
  }

  footer span {
    display: inline-block;
    margin: 0 2px;
  }
    .v-text-field {
        margin: 0px 16px;
    }
}
</style>

<style>
    
    .v-content {
        padding: 100px 0px 0px !important;
    }
    
    .v-item-group.v-bottom-nav .v-btn {
        padding: 0px;
    }
    
    .v-item-group.v-bottom-nav .v-btn--active {
        padding: 0px;
    }
    
.v-item-group.v-bottom-nav .v-btn--active .v-btn__content {
    font-size: 14px;
    min-height: 48px;
}

.v-toolbar__extension {
  height: 56px !important;
}
.v-btn {
    font-size: 16px;
    height: 45px;
    box-shadow: none !important;
}
    .v-btn:hover {
        background: #174ea6 !important;
    }
    
/* check how to add primary color */
.v-btn--active {
    color: #4285F4 !important;
}

.v-input--is-focused .v-input__slot {
    background: #ffffff !important;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,0.2),0 2px 2px 0 rgba(0,0,0,0.14),0 1px 5px 0 rgba(0,0,0,0.12);
}

.no-underline {
  text-decoration: none;
}

.v-toolbar__content {
    height: 64px !important;
}

.v-input__slot {
    /* border-radius: 8px !important; */
    border-radius: 50px !important;
    background: #f1f3f4 !important;
    font-weight: 500;
}

.v-input__icon i {
    color: #717171 !important;
}

.v-text-field .v-input__prepend-inner {
    padding-right: 8px;
}
    
@media (max-width: 959px) {
    
    main {
        padding: 96px 0px 0px !important;
    }
    
    .v-input__slot {
        min-height: 40px;
    }
    
    .v-toolbar__extension {
        height: 32px !important;
    }
    
    input {
        color: #8E8E93 !important;
    }
    
    .v-input__slot {
        background: #f5f5f5;
    }
    
}

</style>


<script>
import People from '../components/People.vue';
import Startup from '../components/Startup.vue';
import More from '../components/More.vue';

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

export default {
  name: 'Tabs',
  components: {
    People,
    Startup,
    More,
  },
  data: () => ({
    title: 'GFS Directory',
    searching: false,
    tabs: 'tabs-people',
    search: '',
    tagFilter: [],
    dialog: false,
    tabClicked: null,
  }),
  methods: {
    checkChildren,
    searchOpen,
    searchClose,
    searchClear,
    trackSearch,
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
    switchTag(name) {
      const index = this.tagFilter.indexOf(name);
      if (index === -1) {
        this.tagFilter.push(name);
        this.$ga.event('list_people', 'filter_add', name);
      } else {
        this.tagFilter.splice(index, 1);
        this.$ga.event('list_people', 'filter_remove', name);
      }
    },
  },

  created() {
    this.$store.dispatch('tags/getTags');
    this.checkChildren(this.$router.currentRoute.name);
    this.deferPrompt();
  },

  watch: {
    $route(to) {
      this.checkChildren(to.name);
    },
    tabs(to) {
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
