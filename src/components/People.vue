<template>
  <!-- Loading -->
  <v-container v-if="$store.state.people.loading === true">
    <loading></loading>
  </v-container>
  <!-- /Loading -->
  <!-- Nothing found -->
  <v-container
    class="text-xs-center"
    v-else-if="hasPeople"
  >
    <img src="img/illustrations/undraw_people_search_wctu.png" class="illustration">
    <br>
    <h1>No one found</h1>
    <p>
      <a
        v-if="!config.hideAddButton"
        href="/admin/#/suggest-person-public/"
        class="no-underline"
      >
        <v-btn color="primary" class="mb-3">
          Create {{search}}...
        </v-btn>
      </a>
      <br>
      <i class="grey--text">The content will be manually reviewed</i>
    </p>
  </v-container>
  <!-- /Nothing found -->
  <!-- Container -->
  <v-container class="card-grid mb-5 pb-3 pt-2" v-else>
    <v-flex
      xs12 sm6 md3 lg2 xl2
      v-for="person in this.filterPeople(search, filter, programs, sort)"
      :key="person.id"
      class="card-grid-item"
    >
      <!-- <person-card-hybrid :person="person" /> -->
      <person-card-small class="card-grid-item-card hidden-md-and-up"
        :id="person.id"
        :name="person.name"
        :surname="person.surname"
        :pic="person.pic || ''"
        :role="getJob(person).role"
        :company="getJob(person).name"
        :expertise="typeTags(person.Tag, 'HAS_SKILL')"
        :bio="person.bio"
        :location="person.location"
        :twitter="person.twitter"
        :linkedin="person.linkedin">
      </person-card-small>

      <person-card class="card-grid-item-card light-border hidden-sm-and-down"
        :id="person.id"
        :name="person.name"
        :surname="person.surname"
        :pic="person.pic || ''"
        :role="getJob(person).role"
        :company="getJob(person).name"
        :expertise="typeTags(person.Tag, 'HAS_SKILL')"
        :bio="person.bio"
        :location="person.location"
        :twitter="person.twitter"
        :linkedin="person.linkedin">
      </person-card>

    </v-flex>
    <!-- FAB -->
    <a
      v-if="!config.hideAddButton"
      href="/admin/#/suggest-person-public/"
      target="_blank"
      class="no-underline"
    >
      <v-btn
        class="hidden-md-and-up"
        fab
        fixed
        bottom
        right
        color="primary"
      >
        <v-icon>person_add</v-icon>
      </v-btn>
    </a>
    <!-- /FAB -->
  </v-container>
  <!-- /Content -->
</template>

<style scoped>

  .light-border-bottom {
    border-bottom: 1px solid #eaeaea;
    border-radius: 0px;
  }

  .light-border {
    border: 1px solid #eaeaea;
    border-radius: 6px;
  }

  /* aligns FAB | duplicated in Startup.vue */
  .v-btn--bottom {
    bottom: 72px;
  }

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

  @media screen and (max-width: 959px) {
  .container {
    padding: 0px;
  }
}

</style>

<script>
  import PersonCardHybrid from './PersonCardHybrid.vue';
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
      programs: { type: Array, required: false },
      sort: { type: String, required: false },
    },

    components: {
      PersonCardHybrid,
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
        if (!data || typeof data !== 'string' || !Array.isArray(array)) {
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

      filterByCategory(list, tags, programs) {
        let filtered = list;

        if (Array.isArray(tags) && tags.length !== 0) {
          // Filter by tags
          list = list.filter((person) => {
            let clearTags = [];
            if (person.Tag) {
              clearTags = person.Tag.map(item => item.name);
            }

            for (let i = 0; i < tags.length; i += 1) {
              if (!clearTags || !this.inArray(clearTags, tags[i])) {
                return false;
              }
            }
            return true;
          });
        }

        if (Array.isArray(programs) && programs.length !== 0) {
          // Filter by programs
          list = list.filter((person) => {
            if (!person.program) return false;

            for (let i = 0; i < programs.length; i += 1) {
              if (person.program.indexOf(programs[i]) > -1) {
                return true;
              }
            }

            return false;
          });
        }

        return list
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
            || (person.surname && person.surname.toUpperCase().indexOf(safeSearch) > -1)
            || (person.bio && person.bio.toUpperCase().indexOf(safeSearch) > -1)
            || (person.program && person.program.toUpperCase().indexOf(safeSearch) > -1)
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
       *  @param {array} tags Filter by tags to search
       *  @param {array} programs Filter by tags to search
       *  @return {array} An array that matches the requested search term
       */
      filterPeople(search, tags, programs, sort) {
        // filter by tags
        const filteredByCategory = this.filterByCategory(this.$store.state.people.list, tags, programs);

        // Filter by search text
        let filtered = [ ...this.filterByText(filteredByCategory, search) ];

        if (!sort) {
          return filtered;
        }

        if (sort === 'abc') {
          return filtered.sort((a, b) => {
            let aName = a.name;
            let bName = b.name;
            if (this.config.surnameFirst) {
              aName = a.surname;
              bName = b.surname;
            }
            return (aName.toUpperCase() < bName.toUpperCase()) ? -1 : 1;
          });
        } else if (sort === 'startup') {
          filtered = filtered.sort((a, b) => {
            if (!a.Group) return 1;
            if (!b.Group) return 1;

            return (a.Group[0].name.toUpperCase() < b.Group[0].name.toUpperCase()) ? -1 : 1;
          });
        }

        return filtered;
      },

      getJob(person) {
        let job = {};
        if (person.Group && person.Group.length > 0) {
          [job] = person.Group;
        }

        return job;
      },

      typeTags(list, type) {
        if (!list) return [];

        return list.filter(tag => {
          const tagTypes = tag.relations ? tag.relations.map(type => type.toUpperCase()) : [];

          if (tagTypes.indexOf(type) > -1) {
            return true;
          }

          return false;
        });
      },
    },
    computed: {
      config() {
        return this.$store.state.config.config;
      },
      hasPeople() {
        return this.filterPeople(this.search).length === 0;
      },
    },
    created() {
      this.$store.dispatch('people/getPeople');
    },
  };
</script>
