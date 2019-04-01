<template>
  <v-container v-if="loading === true">
    <loading></loading>
  </v-container>
  <v-container v-else-if="hasStartups && hasOrganizations" class="text-xs-center">
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
        :id="startup._id"
        :name="startup.name"
        :logo="startup.logo"
        :people="startup.employees"
        :bio="startup.description"
        :accelerator="startup.accelerator"
        :location="startup.location">
      </startup-card>
    </v-flex>
    <v-flex xs12 sm6 md4 lg3 xl2 class="card-grid-item"
      v-for="org in this.filterOrganization(search)"
      :key="org.name">
      <organization-card class="card-grid-item-card"
        :name="org.name"
        :logo="org.logo"
        :people="org.employees"
        :bio="org.description"
      >
      </organization-card>
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
import OrganizationCard from './OrganizationCard.vue';
import StartupCard from './StartupCard.vue';
import Loading from './Loading.vue';

// If you want to make data persistent throught sessions, you can use localStorage
const storage = window.localStorage;

export default {
  name: 'Startup',
  props: {
    search: { type: String, required: false },
  },

  data: () => ({
    loading: true,
    list: [],
    orgs: [],
  }),

  components: {
    StartupCard,
    OrganizationCard,
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
        return this.list;
      }

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
    },

    cacheExpired(date) {
      if (!date) {
        return true;
      }

      const now = new Date();
      const last = new Date(date);

      if (last.getFullYear() < now.getFullYear()) {
        return true;
      } if (last.getMonth() < now.getMonth()) {
        return true;
      } if (last.getDate() + 1 < now.getDate()) {
        return true;
      }
      return false;
    },

    /** loadStartup
     *  Get a startup list from localstorage or backend.
     *
     *  @return {Promise} The fetch promise.
     */
    loadStartup() {
      const localStartups = storage.getItem('startup-list');
      const localStartupsTime = storage.getItem('startup-list-time');

      const expired = this.cacheExpired(localStartupsTime);

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
    },

    /** downloadStartup
     *  Get the startup list from the backend. It stores in component's this.list
     *
     *  @return {Promise} The fetch promise.
     */
    downloadStartup() {
      const token = storage.getItem('token');
      const needAuth = process.env.VUE_APP_NEED_AUTH === 'true';

      if (!token && needAuth) {
        console.log('You shall not pass');
        this.$router.push('/');
        return false;
      }

      return fetch(`${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_API_STARTUPS}`, {
        method: 'GET',
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      })
        .then(res => res.json())
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
    },
    /** loadOrganization
     *  Get the organization list from the backend. It stores in component's this.list
     *
     *  @return {Promise} The fetch promise.
     */
    loadOrganization() {
      const token = storage.getItem('token');
      const needAuth = process.env.VUE_APP_NEED_AUTH === 'true';

      if (!token && needAuth) {
        console.log('You shall not pass');
        this.$router.push('/');
        return false;
      }

      return fetch(`${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_API_ORGS}`, {
        method: 'GET',
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      })
        .then(res => res.json())
        .then((data) => {
          this.loading = false;
          this.orgs = data;
        })
        .catch((err) => {
          this.loading = false;
          console.error(err);
        });
    },

    /** filterOrganization
     *  Return a new array wit organizations that matches with the search input passed
     *  as param. It uses as list the component's this.list. It check in name,
     *  description and accelerator
     *
     *  @param search {String} Search term to filter the organization list
     *  @return {Array} An array that matches with search params
     */
    filterOrganization(search) {
      const safeSearch = search && (search.toUpperCase() || '');
      if (!safeSearch) {
        return this.orgs;
      }

      return this.orgs.filter((org) => {
        let found = false;
        if ((org.name && org.name.toUpperCase().indexOf(safeSearch) > -1)
          || (org.description && org.description.toUpperCase().indexOf(safeSearch) > -1)
          || (org.accelerator && org.accelerator.toUpperCase().indexOf(safeSearch) > -1)
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
    hasOrganizations() {
      return this.filterOrganization(this.search).length === 0;
    },
  },

  created() {
    this.loadStartup();
    this.loadOrganization();
  },
};
</script>
