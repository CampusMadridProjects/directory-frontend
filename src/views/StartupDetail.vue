<template>

  <v-card light class="full-size">

    <!-- Actions -->
    <v-toolbar>
      <v-btn fab small @click="$router.replace('/directory');">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <!-- <v-toolbar-title></v-toolbar-title> -->
      <v-spacer></v-spacer>
      <a :href="'/admin/#/suggest-startup-public/'+ id"
        target="_blank"
        class="no-underline"
      >
        <v-btn fab small class="mx-0">
          <v-icon>edit</v-icon>
        </v-btn>
      </a>
    </v-toolbar>
    <!-- /Actions -->

    <!-- Loading -->
    <div v-if="loading" class="mt-5 pt-5">
      <loading></loading>
    </div>
    <!-- /Loading -->

    <!-- Content -->
    <div>
      <!-- Startup logo -->
      <v-card-media>
        <div class="text-xs-center">
          <v-img
            :src="data.logo || 'img/nologo.png'"
            class="startup-logo"
            aspect-ratio="1"
          />
        </div>
      </v-card-media>
      <!-- /Startup logo -->
      <!-- Startup info -->
      <div class="text-xs-left">
        <div class="container-1">
          <!-- Name and program -->
          <div class="startup-info text-xs-left">
            <div class="headline">{{ data.name }}</div>
            <div>{{ data.accelerator }}</div>
          </div>
          <!-- /Name and program -->
          <!-- Bio -->
          <span v-if="data.bio" class="subheading">
            {{ data.bio }}
          </span>
          <!-- /Bio -->
          <!-- Website -->
          <div class="pa-0 my-2 bottom-cta">
            <v-btn
              x-large
              color="primary"
              v-if="data.website"
              :href="$link(data.website)"
              target="_blank"
              class="elevation-0 br-6 bottom-cta"
              @click="$ga.event('startup_detail', 'website', data.website)"
            >
              Visit website
            </v-btn>
          </div>
          <!-- /Website -->
        </div>
      </div>
      <!-- /Startup info -->
      <!-- Location -->
      <v-card-title v-if="data.location" primary-title>
        <div class="location">
          <v-icon size="14" class="mr-1">room</v-icon>
          <span>{{ data.location }}</span>
        </div>
      </v-card-title>
      <!-- /Location -->
      <!-- Membership dates -->
      <!-- <v-card-title primary-title>
        <div class="location">
          <v-icon size="14" class="mr-1">calendar_today</v-icon>
          <span>Member from 10/2020 to 10/2021</span>
        </div>
      </v-card-title> -->
      <!-- /Membership dates -->
      <v-divider></v-divider>
      <!-- /Employees -->
      <div
        v-if="data.persons && data.persons.length > 0"
        class="startup-employees px-4 my-2"
      >
        <h2>Team</h2>
        <person-list :people="data.persons" event-category="startup_detail"></person-list>
      </div>
      <!-- /Employees -->
      <v-divider></v-divider>
      <!-- Social profiles -->
      <social-links
        :data="data"
        :config="config"
        class="px-4 my-3"
      />
      <!-- /Social profiles -->
    </div>
    <!-- /Content -->

  </v-card>

</template>

<style scoped>

  /* makes toolbar icons bigger */
  .v-toolbar .v-btn--floating.v-btn--small .v-icon {
      font-size: x-large;
  }

  /* styles for the detail view | repeated in person detail */
  .full-size {
    border-radius: 0 !important;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    height: auto;
  }

  .v-subheader {
      padding: 0px;
  }

  >>> .v-list__tile {
      min-height: 72px !important;
      padding: 0px;
      border: 1px solid #f0f0f0;
      border-radius: 4px;
      margin-bottom: 8px;
  }

  .v-btn--icon {
    min-width: 36px;
  }


  /*** TOOLBAR ***/

  .v-toolbar {
    background-color: transparent;
    box-shadow: none;
    margin-bottom: -64px;
    z-index: 1;
    position: fixed;
    width: 360px;
  }

  /* adds shadow to detail toolbar icons */
  .v-toolbar .v-btn {
    background: white !important;
    box-shadow: 0 2px 4px -1px rgba(0,0,0,.2) !important;
  }

  .v-toolbar__title {
    width: 80%;
    text-align: center;
    margin: 0px;
  }

  /*** /TOOLBAR ***/

  /*** STARTUP STYLES ***/

  .startup-logo {
    width: 100%;
  }

  .startup-info {
    text-align: center;
  }

  .startup-employees {
    max-width: 500px;
    margin: auto;
    /* border-top: 1px solid #f0f0f0; */
    margin-top: 12px;
    padding-top: 8px;
  }

  /*** /STARTUP STYLES ***/

  @media screen and (max-width: 768px) {
    .bottom-cta {
      width: 100%;
    }
    .v-toolbar {
      width: 100% !important;
    }
  }

  @media (max-width: 960px) {

    .v-toolbar__content>:first-child.v-btn--icon,
    .v-toolbar__extension>:first-child.v-btn--icon {
      margin-left: 0px;
    }

  }
</style>

<script>
  import PersonList from '../components/PersonList.vue';
  import SocialLinks from '@/components/SocialLinks.vue';

  export default {
    name: 'StartupDetail',
    components: {
      PersonList,
      SocialLinks,
    },
    data: () => ({
      loading: true,
      id: null,
      data: {},
    }),
    computed: {
      config() {
        return this.$store.state.config.config;
      },
    },
    methods: {
      getData() {
        this.data = this.$store.getters['startups/getById'](this.id);
        this.loading = false;
      },
    },
    created() {
      this.id = this.$router.currentRoute.params.id;

      if (this.$store.state.people.list.length > 0) {
        this.getData();
      } else {
        this.$store.dispatch('startups/getStartups')
          .then(this.getData);
      }
    },
  };
</script>
