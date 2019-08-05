<template>
  <v-container v-if="$store.state.people.loading === true">
    <loading></loading>
  </v-container>
  <v-container
    class="text-xs-center"
    v-else-if="hasPeople"
  >
    <img src="img/illustrations/undraw_people_search_wctu.png" class="illustration"> <br>
    <h1>No one found</h1>
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
    <v-flex
      xs12 sm6 md4 lg3 xl2
      class="card-grid-item"
      v-for="person in this.filterPeople(search, filter)"
      :key="person._id">

      <person-card-small class="card-grid-item-card hidden-md-and-up"
        :id="person.id"
        :name="person.name"
        :pic="person.pic"
        :role="getJob(person).role"
        :company="getJob(person).name"
        :expertise="person.Tag"
        :bio="person.bio"
        :location="person.location"
        :twitter="person.twitter"
        :linkedin="person.linkedin">
      </person-card-small>

      <person-card class="card-grid-item-card hidden-sm-and-down"
        :id="person.id"
        :name="person.name"
        :pic="person.pic"
        :role="getJob(person).role"
        :company="getJob(person).name"
        :expertise="person.Tag"
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
          if (!person.expertise || !this.inArray(person.expertise, categories[i])) {
            return false;
          }
        }

        return true;
      });
    },

    filterByText(list, search) {
      const safeSearch = search && (search.toUpperCase() || '');

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
      const filteredByCategory = this.filterByCategory(this.$store.state.people.list, filter);

      // Filter by search text
      return this.filterByText(filteredByCategory, search);
    },

    getJob(person) {
      let job = {};
      if (person.Group && person.Group.length > 0) {
        job = person.Group[0];
      }

      return job;
    }
  },

  computed: {
    hasPeople() {
      return this.filterPeople(this.search).length === 0;
    },
  },

  created() {
    this.$store.dispatch('people/getPeople');
  },
};
</script>
