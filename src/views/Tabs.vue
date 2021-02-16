<template>
  <v-app>
    <v-toolbar :extended="hasFilters" app class="light-border-bottom">
      <img :src="logo" class="logo" :title="title">
      <v-text-field
        prepend-inner-icon="search"
        hide-details
        flat
        solo
        v-model="search"
        clearable
        color="primary"
        background-color="#f1f3f4"
        class="search-box"
        :placeholder="searchPlaceholder"
        @keyup="trackSearch(search)"
        @click:clear="searchClear()"
        @click="goToSearchMenu"
      ></v-text-field>
      <!-- Add profile button -->
      <v-btn
        v-if="!config.hideAddButton"
        large
        color="primary"
        href="/admin/#/suggest-public"
        class="elevation-0 hidden-md-and-down"
      >
        <v-icon left>add</v-icon>Add Profile
      </v-btn>
      <!-- /Add profile button -->
      <!-- Filter chips -->
      <v-container
        v-if="hasFilters"
        slot="extension"
        fluid
        class="px-0 pb-2 ma-0 chip-container"
        v-touch="{
          left: () => noSwipe(),
          right: () => noSwipe(),
        }"
      >
        <div class="scroll-container">
          <div class="text-md-center chip-content">
            <!-- All filters button -->
            <v-chip
              @click="allFilters = !allFilters"
            >
              <v-icon class="ml-0 px-1">tune</v-icon>
              <!-- <span v-else><v-icon class="ml-0">tune</v-icon>({{ tagFilter.length }})</span> -->
            </v-chip>
            <!-- /All filters button -->

            <!-- Sort dropdown chip -->
            <sorting-filter
              v-model="sortBy"
            />
            <!-- /Sort dropdown chip -->

            <!-- Dropdown chip -->
            <program-filter
              v-if="hasProgram"
              v-model="activePrograms"
            />
            <!-- /Dropdown chip -->

            <!-- Skill chips -->
            <v-chip
              v-for="tag in tagList"
              :key="tag.id"
              :class="{ 'active': tagFilter.indexOf(tag.name) > -1 }"
              @click="switchTag(tag.name)"
            >
              <span class="px-2">{{ tag.name }}</span>
            </v-chip>
            <!-- Skill chips -->
            <!-- All filters again -->
            <v-btn @click="allFilters = !allFilters" flat color="primary" class="ml-0 mr-3"><strong>All filters</strong></v-btn>
            <!-- /All filters again -->
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
      <div>
        <v-chip
          v-for="tag in tagList"
          :key="tag.id"
          :class="{ 'active': tagFilter.indexOf(tag.name) > -1 }"
          @click="switchTag(tag.name)"
        >
          {{ tag.name }}
        </v-chip>
      </div>
      <div v-if="hasProgram">
        <p class="px-2 pt-4">Programs</p>
        <v-chip
        v-for="program in programs"
        :key="program.name"
        :class="{ 'active': program.active }"
        @click="switchProgram(program.name)"
      >
        {{ program.name }}
      </v-chip>
      </div>
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
          <People
            :search="search"
            :filter="tagTabFilter"
            :programs="activePrograms"
            :sort="sortBy"
          />
        </v-tab-item>
        <v-tab-item
          v-if="config.showStartups !== false"
          value="tabs-startups"
        >
          <Startup
            :search="search"
            :filter="tagTabFilter"
            :programs="activePrograms"
            :sort="sortBy"
          />
        </v-tab-item>
        <v-tab-item
          v-if="config.showMore !== false"
          value="tabs-more"
        >
          <More
            :active-item="moreActiveItem"
          />
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
        <span>Home</span>
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

    <cookies-notice @read="goToCookiesPolicy" />

  </v-app>
</template>

<style scoped>

  .v-input {
    font-size: 1.2rem;
  }

  /* Adds cursor hover to chips */
  .v-chip span, .v-chip i {
    cursor: pointer;
    line-height: initial;
  }

  .light-border-bottom {
    border-bottom: 1px solid #eaeaea;
    border-radius: 0px;
  }

  /* .light-border-bottom:after {
    content:"";
    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(234,234,234,1) 24%, rgba(234,234,234,1) 100%);
    display: block;
    height: 1px;
    width: 100%;
    position: absolute;
    bottom: 0;
  } */

  >>> .v-toolbar .v-chip .v-chip__content {
    padding: 0px;
  }

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

  /* */
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
    /* font-weight: 500; */
    font-size: 1.1rem;
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

  .v-text-field.v-text-field--solo .v-input__control {
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }

    .scroll-container {
      overflow-x: auto;
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

  /* search box interaction */
  >>> .theme--light.v-text-field--solo>.v-input__control>.v-input__slot {
    border-radius: 50px;
    font-weight: 500;
    border: 1px solid #e6e6e6;
  }

  >>> .v-input--is-focused .v-input__slot {
    background: white !important;
    border: 1px solid #e6e6e6 !important;
  }

  >>> .v-input--is-label-active .v-input__slot {
    background: white !important;
  }

  .search-box >>> .v-input__icon i {
      color: #717171 !important;
  }

  .search-box >>> .v-text-field .v-input__prepend-inner {
      padding-right: 8px;
  }
  /* /search box interaction */

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

    /* Fixes library default toolbar styles in mobile */
    >>> .v-toolbar__extension {
      margin-top: -12px !important;
      margin-bottom: 8px !important;
    }

    /* bigger text size in search box mobile */
    .v-input {
      font-size: 1.4rem;
    }

    .v-footer {
      height: auto !important;
      padding: 16px 0px;
      box-sizing: border-box;
      padding-bottom: 80px !important;
    }

    footer span {
      padding: 8px;
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
      width: 136px !important;
      padding: 0px 24px;
      background: white;
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
      margin-left: 116px !important;
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
    height: 48px !important;
    margin-top: -12px;
    margin-bottom: 16px;
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

  .no-underline {
    text-decoration: none;
  }

  .v-toolbar__content {
    height: 56px !important;
    align-content: center;
    margin: 8px 0px;
  }

  .v-input__icon i {
      color: #717171 !important;
  }

  .v-text-field .v-input__prepend-inner {
      padding-right: 8px;
  }*/

  @media (max-width: 959px) {

    /* provisonal fix for toolbar extension misalignment */
    .v-toolbar__content {
      margin-bottom: -2px;
    }

    main {
      padding: 96px 0px 0px !important;
    }

    .v-content {
      padding: 120px 0px 0px !important;
    }

  }

</style>

<script>
  import Home from '../components/Home.vue';
  import People from '../components/People.vue';
  import ProgramFilter from '../components/ProgramFilter.vue';
  import SortingFilter from '../components/SortingFilter.vue';
  import Startup from '../components/Startup.vue';
  import More from '../components/More.vue';
  import CookiesNotice from '@/components/CookiesNotice.vue';

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
      ProgramFilter,
      SortingFilter,
      Startup,
      More,
      CookiesNotice,
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
      moreActiveItem: null,
      activePrograms: [],
      sortBy: 'new',  // new, abc, startup
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
      hasProgram() {
        return this.config.hasProgram && this.config.programOptions;
      },
      programs() {
        const programs = this.config.programOptions;
          if (programs) {
          return programs.split(',').map((item) => {
            return {
              name: item,
              active: this.activePrograms.indexOf(item) > -1,
            };
          });
        }

        return [];
      }
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
        if (this.config.showHome === false) {
          this.tabs = 'tabs-people';
        }
      },

      checkInitialQuery() {
        const program = Number(this.$route.query.program);
        if (!this.config.programOptions || isNaN(program)) {
          return false;
        }

        const programs = this.config.programOptions.split(',');
        const initialProgram = programs[this.$route.query.program];
        if (initialProgram) {
          this.activePrograms.push(initialProgram);
        }
      },

      checkInitialState() {
        if (this.$store.state.config.loaded === true) {
          this.checkInitialQuery();
          this.checkInitialTab();
        } else {
          return setTimeout(this.checkInitialState, 200);
        }
      },

      goToCookiesPolicy() {
        this.moreActiveItem = 1;
        this.tabs = 'tabs-more';
      },

      switchProgram(program) {
        const index = this.activePrograms.indexOf(program);

        if (index !== -1) {
          this.activePrograms.splice(index, 1);
        } else {
          this.activePrograms.push(program)
        }
      },
    },

    created() {
      this.$store.dispatch('tags/getTags');
      this.checkChildren(this.$router.currentRoute.name);
      this.deferPrompt();
      this.checkInitialState();
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
