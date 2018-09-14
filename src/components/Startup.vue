<template>
  <v-container v-if="loading === true">
    <loading></loading>
  </v-container>
  <v-container v-else-if="filterStartup(search).length === 0">
    <h1>Nothing found<br />¯\_(ツ)_/¯</h1>
  </v-container>
  <v-container class="card-grid" v-else>
    <v-flex xs12 sm6 md4 lg3 xl2 class="card-grid-item"
      v-for="startup in filterStartup(search)"
      :key="startup._id">
      <startup-card class="card-grid-item-card"
        :id="startup._id"
        :name="startup.name"
        :logo="startup.logo"
        :people="startup.employees"
        :bio="startup.description"
        :accelerator="startup.accelerator"
        :location="startup.location">
      </startup-card>
    </v-flex>
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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

// If you want to make data persistent throught sessions, you can use localStorage
const storage = window.sessionStorage;

/** filterStartup
 *  Return a new array wit startups that matches with the search input passed
 *  as param. It uses as list the component's this.list. It check in name,
 *  description and accelerator
 *
 *  @param search {String} Search term to filter the startup list
 *  @return {Array} An array that matches with search params
 */
function filterStartup(search) {
  const safeSearch = search && (search.toUpperCase() || '');
  return this.list.filter((startup) => {
    let found = false;
    if ((startup.name && startup.name.toUpperCase().indexOf(safeSearch) > -1)
      || (startup.description && startup.description.toUpperCase().indexOf(safeSearch) > -1)
      || (startup.accelerator && startup.accelerator.toUpperCase().indexOf(safeSearch) > -1)
    ) {
      found = true;
    }

    return found;
  });
}


function cacheExpired(date) {

  if (!date) {
    return true;
  }

  var now = new Date();
  var last = new Date(date);

  if(last.getFullYear() < now.getFullYear()) {
    return true;
  } else if (last.getMonth() < now.getMonth()) {
    return true;
  } else if (last.getDate() + 1 < now.getDate()) {
    return true;
  } else {
    return false;
  }
}


/** loadStartup
 *  Get a startup list from localstorage or backend.
 *
 *  @return {Promise} The fetch promise.
 */
function loadStartup() {
  const localStartups = storage.getItem('startup-list');
  const localStartupsTime = storage.getItem('startup-list-time');

  const expired = cacheExpired(localStartupsTime);

  if (localStartups === null || expired) {
    return this.downloadStartup();
  }

  // Try to parse JSON
  try {
    const parsedStartups = JSON.parse(localStartups);

    this.list = parsedStartups;
    this.loading = false;

    return Promise.resolve(parsedStartups);
  } catch (e) {
    // In case of error, ask the backend.
    return this.downloadStartup();
  }
}

/** downloadStartup
 *  Get the startup list from the backend. It stores in component's this.list
 *
 *  @return {Promise} The fetch promise.
 */
function downloadStartup() {
  return fetch(`${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_API_STARTUPS}`, {
    method: 'GET',
  }).then(res => res.json())
    .then((data) => {
      this.loading = false;
      this.list = data;
      storage.setItem('startup-list', JSON.stringify(data));
      storage.setItem('startup-list-time', new Date());

      return data;
    })
    .catch((err) => {
      this.loading = false;
      console.error(err);
    });
}

export default {
  name: 'Startup',
  props: {
    search: { type: String, required: false },
  },
  data() {
    return {
      loading: true,
      list: [],
      filterStartup,
      loadStartup,
      downloadStartup,
    };
  },
  components: {
    StartupCard,
    Loading,
  },
  created() {
    this.loadStartup();
  },
};

</script>
