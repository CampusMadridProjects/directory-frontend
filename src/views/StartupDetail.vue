<template>

  <v-card light class="full-size">
    
    <!-- Actions -->
    <v-toolbar>
      <v-btn fab @click="$router.replace('/directory');">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title></v-toolbar-title>
      <v-spacer></v-spacer>
      <a :href="'/admin/#/suggest-startup-public/'+ id"
        target="_blank"
        class="no-underline"
      >
        <v-btn fab class="mx-0">
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
          <img :src="data.logo" class="startup-logo">
        </div>
      </v-card-media>
      <!-- /Startup logo -->
      <!-- Startup info -->
      <div class="text-xs-left">
        <div class="container-1">
          <!-- Name and program -->
          <div class="startup-info">
            <h3 class="headline text-xs-left mb-0">{{ data.name }}</h3>
            <div>{{ data.accelerator }}</div>
          </div>
          <!-- /Name and program -->
          <!-- Bio -->
          <span v-if="data.bio">{{ data.bio }}</span>
          <!-- /Bio -->
          <!-- Website -->
          <a
            v-if="data.website"
            :href="link(data.website)"
            target="_blank"
            class="d-flex pt-2"
          >
            {{ data.website }}
          </a>
          <!-- /Website -->
        </div>
      </div>
        <!-- Location -->
        <v-card-title v-if="data.location" primary-title>
          <div class="location">
            <v-icon size="14" class="mr-1">room</v-icon>
            <span>{{ data.location }}</span>
          </div>
        </v-card-title>
        <!-- /Location -->
        <!-- Membership dates -->
        <v-card-title primary-title>
          <div class="location">
            <v-icon size="14" class="mr-1">calendar_today</v-icon>
            <span>Member from 10/2020 to 10/2021</span>
          </div>
        </v-card-title>
        <!-- /Membership dates -->
        <!-- Social profiles -->
        <div class="px-4 my-3">
          <h4>Social profiles</h4>
          <div class="person-card-social-icons">
            <a v-if="data.instagram"
              :href="data.instagram"
              target="_blank"
              class="person-card-social-icon"
              @click="$ga.event('person_detail', 'instagram', data._id)"
            >
              <img src="img/instagram_64.png" alt="instagram" />
              <span>Instagram</span>
            </a>
            <a v-if="data.twitter"
              :href="data.twitter"
              target="_blank"
              class="person-card-social-icon"
              @click="$ga.event('person_detail', 'twitter', data._id)"
            >
              <img src="img/twitter_64.png" alt="twitter" />
              <span>Twitter</span>
            </a>
            <a v-if="data.linkedin"
              :href="data.linkedin"
              target="_blank"
              class="person-card-social-icon"
              @click="$ga.event('person_detail', 'linkedin', data._id)"
            >
              <img src="img/linkedin_64.png" alt="linkedin" />
              <span>LinkedIn</span>
            </a>
            <a v-if="data.slack"
              :href="slackUrl(data.slack)"
              target="_blank"
              class="person-card-social-icon"
              @click="$ga.event('person_detail', 'slack', data._id)"
            >
              <img src="img/slack_64.png" alt="slack" />
              <span>Slack</span>
            </a>
          </div>
        </div>
        <!-- /Social profiles -->
        <!-- /Employees -->
        <div
          v-if="data.persons && data.persons.length > 0"
          class="startup-employees px-4 my-2"
        >
          <h4>Team</h4>
          <person-list :people="data.persons" event-category="startup_detail"></person-list>
        </div>
        <!-- /Employees -->
      </div>
      <!-- /Startup info -->

    <!-- /Content -->

  </v-card>

</template>

<style scoped>
  
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

  .v-btn:hover {
      background: white !important;
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

  .v-toolbar__content button {
      width: 45px;
  }
  
  /*** /TOOLBAR ***/
  
  /*** STARTUP STYLES ***/

  .startup-logo {
    width: 100%;
  }

  .startup-info {
    text-align: center;
  }

  .startup-card-social-icon img {
    width: 42px;
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

export default {
  name: 'StartupDetail',
  components: {
    PersonList,
  },
  data: () => ({
    loading: true,
    id: null,
    data: {},
  }),
  methods: {
    getData() {
      this.data = this.$store.getters['startups/getById'](this.id);
      this.loading = false;
      console.log(this.data);
    },
    link(url) {
      if (url.toLowerCase().indexOf('http') === -1) {
        return `https://${url}`;
      }

      return url;
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
