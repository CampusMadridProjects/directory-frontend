<template>
  <v-card light class="full-size">
    <v-toolbar dark>
      <v-btn icon dark @click="$router.back();">
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title>Startup</v-toolbar-title>
      <v-spacer></v-spacer>
<!--       <v-toolbar-items>
        <v-btn dark flat @click.native="dialog = false">Save</v-btn>
      </v-toolbar-items> -->
    </v-toolbar>

    <img :src="data.logo" class="startup-logo"></v-card-media>

    <div class="startup-info">
      <h3 class="headline mb-0">{{ data.name }}</h3>
      <div class="grey--text">{{ data.accelerator }}</div>
    </div>

    <v-card-text>
      <v-subheader v-if="data.bio">What do they do?</v-subheader>
      {{ data.bio }}

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
    border-top-right-radius-radius: 0;
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
</style>


<script>
// ToDo (@CodingCarlos):
// A better way to manage the ID discovery

import PersonList from '../components/PersonList.vue';

// If you want to make data persistent throught sessions, you can use localStorage
const storage = window.sessionStorage;

function getStorage() {
  let list = storage.getItem('startup-list');
  try {
    list = JSON.parse(list);
  } catch (e) {
    list = [];
  }

  return list;
}

function searchPerson(list, id) {
  for (let i = list.length - 1; i >= 0; i--) {
    if (list[i]._id === id) {
      return list[i];
    }
  }

  return null;
}

function getData() {
  const id = this.$router.currentRoute.params.id;
  const data = getStorage();

  this.id = id;
  this.data = searchPerson(data, id);

  console.log(this.data);
}

export default {
  name: 'StartupDetail',
  data() {
    return {
      loading: true,
      id: null,
      data: {},
      getData,
    };
  },
  created() {
    this.getData();
  },
  components: {
    PersonList,
  },
};
</script>
