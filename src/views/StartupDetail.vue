<template>
  <v-card light class="full-size">
    <v-toolbar>
      <v-btn icon @click="$router.back();">
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
      <div class="mb-4 mx-5">{{ data.description }}</div>

      <div class="startup-card-social-icons">
        <a v-if="data.twitter"
          :href="data.twitter"
          target="_blank"
          class="startup-card-social-icon"
          @click="$ga.event('startup_detail', 'twitter', data._id)"
        >
          <img src="img/twitter_64.png" alt="twitter" />
        </a>
        <a v-if="data.linkedin"
          :href="data.linkedin"
          target="_blank"
          class="startup-card-social-icon"
          @click="$ga.event('startup_detail', 'linkedin', data._id)"
        >
          <img src="img/linkedin_64.png" alt="linkedin" />
        </a>
      </div>

      <div class="startup-employees">
        <v-subheader>Who's there?</v-subheader>
        <person-list :people="data.employees" event-category="startup_detail"></person-list>
      </div>
    </v-card-text>

  </v-card>
</template>


<style scoped>
.full-size {
  border-radius: 0 !important;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
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
// ToDo (@CodingCarlos):
// A better way to manage the ID discovery

import PersonList from '../components/PersonList.vue';

// If you want to make data persistent throught sessions, you can use localStorage
const storage = window.localStorage;

function getStorage() {
  let list = storage.getItem('startup-list');
  try {
    list = JSON.parse(list);
  } catch (e) {
    list = [];
  }

  return list;
}

function searchStartup(list, id) {
  for (let i = list.length - 1; i >= 0; i -= 1) {
    if (list[i]._id === id) {
      return list[i];
    }
  }

  return null;
}

function getData() {
  const { id } = this.$router.currentRoute.params;
  const data = getStorage();

  this.id = id;
  this.data = searchStartup(data, id);
}

export default {
  name: 'StartupDetail',
  data: () => ({
    loading: true,
    id: null,
    data: {},
    getData,
  }),

  created() {
    this.getData();
  },

  components: {
    PersonList,
  },
};
</script>
