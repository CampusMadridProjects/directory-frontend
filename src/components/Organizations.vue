<template>
  <v-container v-if="loading === true">
    <loading></loading>
  </v-container>
  <v-container v-else-if="this.filterOrganization(search).length === 0" class="text-xs-center">
    <h1>Nothing found<br />¯\_(ツ)_/¯</h1>
  </v-container>
  <v-container class="card-grid" v-else>
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
import Loading from './Loading.vue';

// If you want to make data persistent throught sessions, you can use localStorage
const storage = window.localStorage;

export default {
  name: 'Organizations',
  props: {
    search: { type: String, required: false },
  },

  components: {
    OrganizationCard,
    Loading,
  },

  data: () => ({
    loading: true,
    list: [],
  }),

  methods: {
    /** loadOrganization
     *  Get the organization list from the backend. It stores in component's this.list
     *
     *  @return {Promise} The fetch promise.
     */
    loadOrganization() {
      const token = storage.getItem('token');
      if (!token) {
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
          this.list = data;
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
        return this.list;
      }

      return this.list.filter((org) => {
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

  created() {
    this.loadOrganization();
  },
};
</script>
