<template>
  <v-container v-if="loading === true">
    <loading></loading>
  </v-container>
  <v-container
    class="text-xs-center"
    v-else-if="this.filterPeople(search, filter).length === 0"
  >
    <h1>Nothing found<br />¯\_(ツ)_/¯</h1>
  </v-container>
  <v-container class="card-grid" v-else>
    <v-flex
      xs12 sm6 md4 lg3 xl2
      class="card-grid-item"
      v-for="person in this.filterPeople(search, filter)"
      :key="person._id">

      <person-card-small class="card-grid-item-card hidden-md-and-up"
        :id="person._id"
        :name="person.name"
        :pic="person.pic"
        :role="person.role"
        :company="person.company"
        :expertise="person.expertise"
        :bio="person.bio"
        :location="person.location"
        :twitter="person.twitter"
        :linkedin="person.linkedin">
      </person-card-small>

      <person-card class="card-grid-item-card hidden-sm-and-down"
        :id="person._id"
        :name="person.name"
        :pic="person.pic"
        :role="person.role"
        :company="person.company"
        :expertise="person.expertise"
        :bio="person.bio"
        :location="person.location"
        :twitter="person.twitter"
        :linkedin="person.linkedin">
      </person-card>

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
import PersonCard from './PersonCard.vue';
import PersonCardSmall from './PersonCardSmall.vue';
import Loading from './Loading.vue';

// If you want to make data persistent throught sessions, you can use localStorage
const storage = window.localStorage;

export default {
  name: 'People',
  props: {
    search: { type: String, required: false },
    filter: { type: Array, required: false },
  },

  components: {
    PersonCard,
    PersonCardSmall,
    Loading,
  },

  data: () => ({
    loading: true,
    list: [],
  }),

  methods: {
    inArray(array, data) {
      if (typeof data !== 'string') {
        return false;
      }

      let found = false;
      for (let i = array.length - 1; i >= 0; i -= 1) {
        if (array[i].toUpperCase().indexOf(data.toUpperCase()) > -1) {
          found = true;
        }
      }

      return found;
    },

    filterByCategory(list, categories) {
      if (!Array.isArray(categories) || categories.length === 0) {
        return list;
      }

      return list.filter((person) => {
        for (let i = 0; i < categories.length; i += 1) {
          if (person.expertise && this.inArray(person.expertise, categories[i])) {
            return true;
          }
        }

        return false;
      });
    },

    filterByText(list, search) {
      const safeSearch = search && (search.toUpperCase() || '');

      console.log(safeSearch);
      if (safeSearch === '' || !safeSearch) {
        return list;
      }

      return list.filter((person) => {
        let found = false;

        // Search by text
        if ((person.name && person.name.toUpperCase().indexOf(safeSearch) > -1)
          || (person.bio && person.bio.toUpperCase().indexOf(safeSearch) > -1)
          || (person.location && person.location.toUpperCase().indexOf(safeSearch) > -1)
          || (person.company && person.company.toUpperCase().indexOf(safeSearch) > -1)
          || (person.expertise && this.inArray(person.expertise, safeSearch))
        ) {
          found = true;
        }

        return found;
      });
    },

    /** filterPeople
     *  Given a search term, return an array with only the people that matches in
     *  any way with the term.
     *
     *  @param {string} search Search query to filter persons
     *  @param {array} filter Filter by categories to search
     *  @return {array} An array that matches the requested search term
     */
    filterPeople(search, filter) {
      // filter by categories
      const filteredByCategory = this.filterByCategory(this.list, filter);

      // Filter by search text
      return this.filterByText(filteredByCategory, search);
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

    /** loadPeople
     *  Get a people list from localstorage or backend.
     */
    loadPeople() {
      const localPeople = storage.getItem('people-list');
      const localPeopleTime = storage.getItem('people-list-time');

      const expired = this.cacheExpired(localPeopleTime);
      console.log(expired);

      if (localPeople === null || expired) {
        return this.downloadPeople();
      }

      // Try to parse JSON
      try {
        const parsedPeople = JSON.parse(localPeople);

        this.list = parsedPeople;
        this.loading = false;

        return Promise.resolve(parsedPeople);
      } catch (e) {
        // In case of error, ask the backend.
        return this.downloadPeople();
      }
    },

    /** downloadPeople
     *  Get a people list from the backend. Also, parse some possible exceptions.
     */
    downloadPeople() {
      const token = storage.getItem('token');
      if (!token) {
        console.log('You shall not pass');
        this.$router.push('/');
        return false;
      }

      return fetch(`${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_API_PEOPLE}`, {
        method: 'GET',
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        // body:JSON.stringify({title:"a new todo"})
      })
        .then(res => res.json())
        .then((data) => {
          this.loading = false;

          const cleanData = data.map((item) => {
            const person = item;

            if (typeof person.location === 'number') {
              person.location = `L${person.location}`;
            }

            return person;
          });

          this.list = cleanData;
          storage.setItem('people-list', JSON.stringify(cleanData));
          storage.setItem('people-list-time', new Date());

          return cleanData;
        })
        .catch((err) => {
          this.loading = false;
          console.error(err);
        });
    },
  },

  created() {
    this.loadPeople();
  },
};
</script>
