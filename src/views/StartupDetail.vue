<template>
  <v-card light class="full-size">
    <v-toolbar>
      <v-btn fab @click="$router.replace('/directory');">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title></v-toolbar-title>
      <v-spacer></v-spacer>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScaem-y35W3AJeuUAeviZEkqecG98fDOBQErBw0UzJqKsa06g/viewform"
          target="_blank"
          class="no-underline"
        >
          <v-btn
            flat color="primary"
            class="custom-button"
          >
            Update this startup
          </v-btn>
        </a>
    </v-toolbar>

    <v-card-media>
      <div class="text-xs-center">
        <img :src="data.logo" class="startup-logo">
      </div>
    </v-card-media>

    <div class="startup-info">
      <h3 class="headline mb-0">{{ data.name }}</h3>
      <div class="grey--text">{{ data.accelerator }}</div>
    </div>

    <v-card-text>
      <v-subheader v-if="data.bio">What do they do?</v-subheader>
      <div class="mb-4 mx-5">{{ data.bio }}</div>
      <a
        v-if="data.website"
        :href="link(data.website)"
        target="_blank"
        class="mb-4 mx-5"
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
        <v-subheader>Who's there?</v-subheader>
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
}

.v-toolbar {
  background-color: transparent;
  box-shadow: none;
}

.v-toolbar__title {
  width: 80%;
  text-align: center;
  margin: 0px;
}

.v-btn--icon {
  min-width: 36px;
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

    if (this.$store.state.people.list.length > -1) {
      this.getData();
    } else {
      this.$store.dispatch('startups/getStartups').then(this.getData);
    }
  },
};
</script>
