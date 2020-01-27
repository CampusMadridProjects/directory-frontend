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
      <a href="/admin/#/suggest-person-public/" target="_blank" class="no-underline">
        <v-btn color="primary" class="mb-3">
          Create {{search}}...
        </v-btn>
      </a><br>
      <i class="grey--text">The content will be manually reviewed</i>
    </p>
  </v-container>
  <v-container class="card-grid mb-5 pb-3" v-else>
    <v-flex
      xs12 sm6 md3 lg2 xl2
      v-for="person in this.filterPeople(search, filter)"
      :key="person._id"
      class="card-grid-item"
    >
      <person-card-small class="card-grid-item-card hidden-md-and-up"
        :id="person.id"
        :name="person.name"
        :surname="person.surnname"
        :pic="person.pic || ''"
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
        :surname="person.surname"
        :pic="person.pic || ''"
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

  .card-grid-item {
    display: flex;
  }

  .card-grid-item-card {
    margin: 6px;
    padding-bottom: 8px;
    border: 1px solid #eaeaea;
  }

  /* adds additional space for 1 more card in wide screens */
  @media screen and (min-width: 1264px){
    .container {
        max-width: 1300px;
    }
    .flex.lg2 {
        flex-basis: 20%;
        max-width: 20%;
    }
    .card-user-pic {
        height: calc(20vw - 80px);
    }
  }

  @media screen and (max-width: 959px) {
    .card-grid-item-card {
      margin: 0px;
      border: 0px;
      padding-bottom: 0px;
    }
    .container {
      padding: 0px;
    }
  }

</style>

<script>
import PersonCard from './PersonCard.vue';
import PersonCardSmall from './PersonCardSmall.vue';
import Loading from './Loading.vue';

function inGroups(groups, val) {
  for (let i = 0; i < groups.length; i += 1) {
    const group = groups[i];
    if (group && group.name && group.name.toUpperCase().indexOf(val.toUpperCase()) > -1) {
      return true;
    }
  }

  return false;
}

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
      if (typeof data !== 'string' || !Array.isArray(array)) {
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

    inTags(array, data) {
      let terms = data.split(' ');
      let found = this.inArray(array, data);

      let occurences = 0;
      for (var i = 0; i < terms.length; i++) {
        if (this.inArray(array, terms[i])) {
          occurences++;
        }
      }
      if (occurences > 0 && occurences === terms.length) {
        found = true;
      }

      return found;
    },

    filterByCategory(list, categories) {
      if (!Array.isArray(categories) || categories.length === 0) {
        return list;
      }

      return list.filter((person) => {
        let clearTags = [];
        if (person.Tag) {
          clearTags = person.Tag.map(item => item.name);
        }

        // console.log(categories);
        // console.log(clearTags);

        for (let i = 0; i < categories.length; i += 1) {
          if (!clearTags || !this.inArray(clearTags, categories[i])) {
            return false;
          }
        }

        return true;
      });
    },

    filterByText(list, search) {
      const safeSearch = search && (search.toUpperCase().trim() || '');

      if (safeSearch === '' || !safeSearch) {
        return list;
      }

      return list.filter((person) => {
        let found = false;
        let expertise = person.Tag && person.Tag.map(tag => tag.name);

        // Search by text
        if ((person.name && person.name.toUpperCase().indexOf(safeSearch) > -1)
          || (person.bio && person.bio.toUpperCase().indexOf(safeSearch) > -1)
          || (person.location && person.location.toUpperCase().indexOf(safeSearch) > -1)
          || (person.Group && inGroups(person.Group, safeSearch))
          // || (person.company && person.company.toUpperCase().indexOf(safeSearch) > -1)
          // || (person.expertise && this.inArray(person.expertise, safeSearch))
          || (expertise && this.inTags(expertise, safeSearch))
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
        [job] = person.Group;
      }

      return job;
    },
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
