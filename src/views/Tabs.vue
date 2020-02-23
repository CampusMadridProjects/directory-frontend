<template>
  <v-app>
    <v-toolbar :extended="hasFilters" app>
      <img :src="logo" class="logo" :title="title">

      <v-text-field
        prepend-inner-icon="search"
        hide-details
        flat
        solo
        v-model="search"
        clearable
        color="#F5F5F5"
        class="search-box"
        :placeholder="searchPlaceholder"
        @keyup="trackSearch(search)"
        @click:clear="searchClear()"
        @click="goToSearchMenu"
      ></v-text-field>

      <v-btn
        large
        color="primary"
        href="/admin/#/suggest-public"
        target="_blank"
        class="elevation-0"
      >
        <v-icon left>add</v-icon>Add Profile
      </v-btn>

      <!-- filter chips -->
      <v-container
        v-if="hasFilters"
        slot="extension"
        fluid
        class="px-0 ma-0 chip-container"
        v-touch="{
          left: () => noSwipe(),
          right: () => noSwipe(),
        }"
      >
        <div class="scroll-container">
          <div class="text-md-center chip-content">
            <span class="mr-2 d-sm-none d-lg-flex">
              Filter by:
            </span>
            <v-chip
              @click="allFilters = !allFilters"
            >
              <v-icon size="14" class="px-1">apps</v-icon>
              <span v-if="tagFilter.length === 0">All filters</span>
              <span v-else>Active filters ({{ tagFilter.length }})</span>
            </v-chip>
            <v-chip
              v-for="tag in tagList"
              :key="tag.id"
              :class="{ 'active': tagFilter.indexOf(tag.name) > -1 }"
              @click="switchTag(tag.name)"
            >
              {{ tag.name }}
            </v-chip>
            <span class="chip-spacer"></span>
          </div>
        </div>
      </v-container>
    </v-toolbar>

    <!-- Open filters -->
    <div v-if="allFilters" class="all-filters">
      <p class="px-2 pt-1">
        Browse all the filters
      </p>
      <v-btn flat icon class="close-filters" @click="allFilters = false">
        <v-icon>close</v-icon>
      </v-btn>
      <v-chip
        v-for="tag in tagList"
        :key="tag.id"
        :class="{ 'active': tagFilter.indexOf(tag.name) > -1 }"
        @click="switchTag(tag.name)"
      >
        {{ tag.name }}
      </v-chip>
    </div>
    <!-- /Open filters -->

    <v-content :class="hasFilters ? '' : 'no-extended'">
      <v-tabs-items v-model="tabs">
        <v-tab-item
          v-if="config.showHome !== false"
          value="tabs-home"
        >
          <Home></Home>
        </v-tab-item>
        <v-tab-item
          v-if="config.showPeople !== false"
          value="tabs-people"
        >
          <People :search="search" :filter="tagTabFilter"></People>
        </v-tab-item>
        <v-tab-item
          v-if="config.showStartups !== false"
          value="tabs-startups"
        >
          <Startup :search="search" :filter="tagTabFilter"></Startup>
        </v-tab-item>
        <v-tab-item
          v-if="config.showMore !== false"
          value="tabs-more"
        >
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
        v-if="config.showHome !== false"
        flat
        value="tabs-home"
      >
        <span>News</span>
        <v-icon>home</v-icon>
      </v-btn>

      <v-btn
        v-if="config.showPeople !== false"
        flat
        value="tabs-people"
      >
        <span>{{ config.peopleText || 'People' }}</span>
        <v-icon>person</v-icon>
      </v-btn>

      <v-btn
        v-if="config.showStartups !== false"
        flat
        value="tabs-startups"
      >
        <span>{{ config.startupsText || 'Teams' }}</span>
        <v-icon>group</v-icon>
      </v-btn>

      <v-btn
        v-if="config.showMore !== false"
        flat
        value="tabs-more"
      >
        <span>{{ config.moreText || 'More' }}</span>
        <v-icon>menu</v-icon>
      </v-btn>

    </v-bottom-nav>

    <v-dialog v-model="dialog" transition="dialog-bottom-transition" persistent>
      <router-view name="dialog"></router-view>
    </v-dialog>

  </v-app>
</template>

<style scoped>

  /* changes default padding for large button */
  .v-btn--large {
    padding: 0 16px;
  }

  /* changes default margin for left icon */
  .v-icon--left {
    margin-right: 8px;
  }

  /* removes padding from tab icon */
  .v-item-group.v-bottom-nav .v-btn .v-btn__content i.v-icon {
    margin-bottom: 0px;
    margin-top: -6px;
  }

  /**/
  .v-item-group.v-bottom-nav .v-btn .v-btn__content span {
    font-weight: bold;
  }

  .v-icon {
    margin-bottom: 0px;
  }

  .v-item-group.v-bottom-nav .v-btn--active .v-btn__content {
    font-weight: bold;
  }

  .v-item-group.v-bottom-nav .v-btn .v-btn__content span {
    font-size: 14px;
  }

  .logo {
    /* width: 115px; */
    height: 21px;
    margin-right: 8px;
  }

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

  .all-filters {
    background: white;
    border: 1px solid #f0f0f0;
    border-radius: 4px;
    left: 16px;
    max-height: 320px;
    overflow: auto;
    padding: 8px 12px;
    position: fixed;
    top: 117px;
    width: calc(100% - 32px);
    z-index: 2;
  }

    .close-filters {
      position: fixed;
      top: 110px;
      right: 12px;
    }

  footer {
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    padding: 24px 0;
  }

  .v-toolbar {
    background-color: #FFFFFF;
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
      border-color: transparent;
      color: #4285F4;
    }

  >>> .v-chip.active:focus .v-chip__content {
      background: #e3e8fd;
  }

  >>> .v-chip:focus .v-chip__content {
      background: #fff;
  }

  .chip-content > span {
    white-space: nowrap;
  }

  .chip-spacer {
    padding: 12px;
  }

  .application.theme--light {
    background: #ffffff;
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

  /*.chip-content {
    text-align: center;
  }*/
    .scroll-container {
      overflow-x: scroll;
      width: calc(100% - 116px);
      margin-left: 116px;
      padding-left: 36px;
    }
      .scroll-container::-webkit-scrollbar {
        background: transparent;
        width: 0;
      }

    .chip-content {
      display: flex;
      align-items: center;
      text-align: left;
      margin: auto;
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



  .search-box >>> .v-input__slot {
    /* border-radius: 8px !important; */
    border-radius: 50px !important;
    background: #f1f3f4 !important;
    font-weight: 500;
    border: 2px solid #f1f3f4;
  }

  .search-box >>> .v-input__icon i {
      color: #717171 !important;
  }

  .search-box >>> .v-text-field .v-input__prepend-inner {
      padding-right: 8px;
  }

  /* bigger-chips-mobile */
  @media only screen and (max-width: 768px) {

    >>> .v-dialog {
      width: 100%;
    }

    .scroll-container {
      margin: 0;
      width: 100%;
      padding-left: 12px;
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

      /* ToDo @CodingCarlos:
        this native vuetify class should be hiding the element in mobile, but its not working for
        no reasong, so i'm adding it here for the moment
      */
      .d-sm-none {
          display: none;
      }

      .search-box >>> input {
        color: #8E8E93 !important;
      }

      .search-box >>> .v-input__slot {
        background: #f5f5f5;
      }
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
      top: 72px;
      justify-content: flex-start;
      width: 96px !important;
      margin: 0px 24px;
    }

      .v-item-group.v-bottom-nav .v-btn {
          max-height: 72px;
          padding: 16px 0px;
          border-radius: 8px;
      }

      /* removes borde from vertical nav */
      .v-bottom-nav {
          border: none;
      }

      .all-filters {
        left: 146px;
        width: calc(100% - 154px);
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

  @media (min-width: 1024px) {
    >>> .v-window__container {
      margin-left: 96px !important;
    }
  }

  /* adapts user pic to smaller desktop screens */
  @media (min-width: 959px) and (max-width: 1263px) {
    >>> .card-user-pic {
      height: calc(26vw - 64px);
    }
    >>> .v-window__container {
      margin-left: 116px !important;
    }
  }

</style>

<style>

  .v-toolbar__extension {
    height: 56px !important;
  }

  .v-content {
    padding: 100px 0px 0px !important;
  }

  .v-content.no-extended {
      padding: 64px 0px 0px !important;
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

  .v-btn {
      font-size: 16px;
  }
      .v-btn.primary:hover {
          background: #174ea6 !important;
      }

  /* check how to add primary color */
  .v-btn--active {
      color: #4285F4 !important;
  }

  .v-input--is-focused .v-input__slot {
    background: #ffffff !important;
  }

  .no-underline {
    text-decoration: none;
  }

  .v-toolbar__content {
    height: 56px !important;
    align-content: center;
    margin: 8px 0px;
  }

  /*.v-input__slot {
    border-radius: 50px !important;
    background: #f1f3f4 !important;
    font-weight: 500;
    border: 2px solid #f1f3f4;
  }

  .v-input__icon i {
      color: #717171 !important;
  }

  .v-text-field .v-input__prepend-inner {
      padding-right: 8px;
  }*/

  @media (max-width: 959px) {

    main {
      padding: 96px 0px 0px !important;
    }

    /*input {
      color: #8E8E93 !important;
    }

    .v-input__slot {
      background: #f5f5f5;
    }*/

    .v-content {
      padding: 124px 0px 0px !important;
    }

  }

</style>

<script>
  import Home from '../components/Home.vue';
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
      Home,
      People,
      Startup,
      More,
    },
    head: {
      title() {
        return {
          inner: 'Directory',
        };
      },
    },
    data: () => ({
      searching: false,
      tabs: 'tabs-home',
      search: '',
      tagFilter: [],
      allFilters: false,
      dialog: false,
      tabClicked: null,
    }),
    computed: {
      config() {
        return this.$store.state.config.config;
      },
      tagTab() {
        return this.tabs.replace('tabs-', '');
      },
      tagList() {
        let tags = this.$store.getters['tags/getByTarget'](this.tagTab) || [];
        return tags;
      },
      hasFilters() {
        let hasFilters = this.tagList.length > 0;
        return hasFilters;
      },
      hasSearch() {
        const searchTabs = ['people', 'startups'];
        const tab = this.tagTab || '';
        const hasSearch = (searchTabs.indexOf(tab) > -1);
        return hasSearch;
      },
      tagTabFilter() {
        let tags = this.tagList.map(item => item.name);
        return this.tagFilter.filter(item => tags.indexOf(item) > -1);
      },
      title() {
        return this.config.title || 'Directory';
      },
      logo() {
        return this.config.logo || 'img/logo.png';
      },
      searchPlaceholder() {
        return this.config.searchPlaceholder || 'Try RatedPower, Andrea or UX';
      },
    },
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

      goToSearchMenu() {
        if(!this.hasSearch) {
          this.tabs = 'tabs-people';
        }
      },

      checkInitialTab() {
        if (this.$store.state.config.loaded === true) {
          if (this.config.showHome === false) {
            this.tabs = 'tabs-people';
          }
        } else {
          return setTimeout(this.checkInitialTab, 200);
        }
      }
    },

    created() {
      this.$store.dispatch('tags/getTags');
      this.checkChildren(this.$router.currentRoute.name);
      this.deferPrompt();
      this.checkInitialTab();
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
