<template>
  <v-card light class="full-size">
    <v-toolbar>
      <v-btn fab @click="$router.replace('/directory');">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title></v-toolbar-title>
      <v-spacer></v-spacer>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLScaem-y35W3AJeuUAeviZEkqecG98fDOBQErBw0UzJqKsa06g/viewform"
          target="_blank"
          class="no-underline"
        >
            <v-btn fab class="mx-0">
              <v-icon>edit</v-icon>
            </v-btn>
        </a>
    </v-toolbar>

    <v-card-media>
      <div class="text-xs-center">
        <img :src="data.logo" class="startup-logo">
      </div>
    </v-card-media>

    <v-card-text class="text-xs-left" style="padding: 8px 24px;">
           <div class="startup-info">
      <h3 class="headline text-xs-left mb-0">{{ data.name }}</h3>
      <div>{{ data.accelerator }}</div>
    </div>
        <!--<v-subheader v-if="data.bio">What do they do?</v-subheader>-->
      <div>{{ data.bio }}</div>
      <a
        v-if="data.website"
        :href="link(data.website)"
        target="_blank"
        class="d-flex py-3"
      >
        {{ data.website }}
      </a>

      <div class="startup-card-social-icons">
        <a v-if="data.twitter && data.twitter !== 'undefined'"
          :href="data.twitter"
          target="_blank"
          class="startup-card-social-icon"
          @click="$ga.event('startup_detail', 'twitter', data._id)"
        >
          <img src="img/twitter_64.png" alt="twitter" />
        </a>
        <a v-if="data.linkedin && data.linkedin !== 'undefined'"
          :href="data.linkedin"
          target="_blank"
          class="startup-card-social-icon"
          @click="$ga.event('startup_detail', 'linkedin', data._id)"
        >
          <img src="img/linkedin_64.png" alt="linkedin" />
        </a>
      </div>

      <div
        v-if="data.persons && data.persons.length > 0"
        class="startup-employees"
      >
<v-subheader>Team</v-subheader>
        <person-list :people="data.persons" event-category="startup_detail"></person-list>
      </div>
    </v-card-text>

  </v-card>
</template>

<style scoped>
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

    .startup-logo {
      max-width: 370px;
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
    border-top: 1px solid #f0f0f0;
    margin-top: 12px;
    padding-top: 8px;
    }

    .v-toolbar {
      background-color: transparent;
      box-shadow: none;
/*        margin-bottom: -64px;*/
        z-index: 1;
    }

    .v-toolbar__title {
      width: 80%;
      text-align: center;
      margin: 0px;
    }

    .v-btn--icon {
      min-width: 36px;
    }
    
    .v-toolbar__content button {
        width: 45px;
    }
    .v-btn:hover {
        background: white !important;
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
    }
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
