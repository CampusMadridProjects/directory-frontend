<template>
  <v-container v-if="$store.state.startups.loading === true">
    <loading></loading>
  </v-container>
  <v-container v-else-if="hasStartups" class="text-xs-center">
    <img src="img/illustrations/undraw_people_search_wctu.png" class="illustration"> <br>
    <h1>Nothing found</h1>
    <p>
      <a href="https://docs.google.com/forms/d/e/1FAIpQLScaem-y35W3AJeuUAeviZEkqecG98fDOBQErBw0UzJqKsa06g/viewform" target="_blank" class="no-underline">
        <v-btn color="primary" class="mb-3">
          Create {{search}}...
        </v-btn>
      </a><br>
      <i class="grey--text">The content will be manually reviewed</i>
    </p>
  </v-container>
  <v-container class="card-grid" v-else>
    <v-flex xs12 sm6 md4 lg3 xl2 class="card-grid-item"
      v-for="startup in this.filterStartup(search)"
      :key="startup._id">
      <startup-card class="card-grid-item-card"
        :id="startup.id"
        :name="startup.name"
        :logo="startup.logo"
        :accelerator="startup.accelerator"
      ></startup-card>
    </v-flex>
  </v-container>
</template>


<style scoped>
h1, h2 {
  font-weight: normal;
}
img.illustration {
  max-width: 250px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.card-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.card-grid-item-card {
  margin: 6px;
}
</style>


<script>
import StartupCard from './StartupCard.vue';
import Loading from './Loading.vue';

export default {
  name: 'Startup',
  props: {
    search: { type: String, required: false },
  },
  components: {
    StartupCard,
    Loading,
  },

  methods: {
    /** filterStartup
     *  Return a new array wit startups that matches with the search input passed
     *  as param. It uses as list the component's this.list. It check in name,
     *  description and accelerator
     *
     *  @param search {String} Search term to filter the startup list
     *  @return {Array} An array that matches with search params
     */
    filterStartup(search) {
      const safeSearch = search && (search.toUpperCase() || '');
      if (!safeSearch) {
        return this.$store.state.startups.list;
      }

      return this.$store.state.startups.list.filter((startup) => {
        let found = false;
        if ((startup.name && startup.name.toUpperCase().indexOf(safeSearch) > -1)
          || (startup.description && startup.description.toUpperCase().indexOf(safeSearch) > -1)
          || (startup.accelerator && startup.accelerator.toUpperCase().indexOf(safeSearch) > -1)
        ) {
          found = true;
        }

        return found;
      });
    },
  },

  computed: {
    hasStartups() {
      return this.filterStartup(this.search).length === 0;
    },
  },

  created() {
    this.$store.dispatch('startups/getStartups');
  },
};
</script>
