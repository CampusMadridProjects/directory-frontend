<template>
  <!-- Loading -->
  <v-container v-if="$store.state.startups.loading === true">
    <loading></loading>
  </v-container>
  <!-- /Loading -->
  <!-- Nothing found -->
  <v-container v-else-if="hasStartups" class="text-xs-center">
    <img src="img/illustrations/undraw_people_search_wctu.png" class="illustration"> <br>
    <h1>Nothing found</h1>
    <p>
      <a href="/admin/#/suggest-startup-public/" target="_blank" class="no-underline">
        <v-btn color="primary" class="mb-3">
          Create {{search}}...
        </v-btn>
      </a><br>
      <i class="grey--text">The content will be manually reviewed</i>
    </p>
  </v-container>
  <!-- /Nothing found -->
  <!-- Container -->
  <v-container class="card-grid pb-5 mb-3" v-else>
    <v-flex
      xs12 sm6 md4 lg3 xl2
      class="card-grid-item"
      v-for="startup in this.filterStartup(search)"
      :key="startup._id"
    >
      <startup-card class="card-grid-item-card"
        :id="startup.id"
        :name="startup.name"
        :logo="startup.logo"
        :accelerator="startup.accelerator"
        :bio="startup.bio"
      ></startup-card>
    </v-flex>
    <!-- FAB -->
    <a href="/admin/#/suggest-startup-public/" target="_blank" class="no-underline">
      <v-btn
        class="hidden-md-and-up"
        fab
        fixed
        bottom
        right
        color="primary"
      >
        <v-icon>group_add</v-icon>
      </v-btn>
    </a>
    <!-- /FAB -->
  </v-container>
  <!-- /Container -->
</template>

<style scoped>

  /* aligns FAB | duplicated in People.vue */
  .v-btn--bottom {
    bottom: 64px;
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

  .card-grid-item-card {
    margin: 6px;
  }

  @media screen and (max-width: 996px) {
    /* changes container padding */
    .container {
      padding: 8px;
    }
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

</style>

<script>
  import StartupCard from './StartupCard.vue';
  import Loading from './Loading.vue';

  export default {
    name: 'Startup',
    props: {
      search: { type: String, required: false },
      filter: { type: Array, required: false, default: () => [], },
    },
    components: {
      StartupCard,
      Loading,
    },

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
      /** filterStartup
       *  Return a new array wit startups that matches with the search input passed
       *  as param. It uses as list the component's this.list. It check in name,
       *  description and accelerator
       *
       *  @param search {String} Search term to filter the startup list
       *  @return {Array} An array that matches with search params
       */
      filterStartup(search) {
        let list = this.$store.state.startups.list;
        list = this.filterByCategory(list, this.filter)
        return this.filterByText(list, search);
      },

      filterByText(list, search) {
        const safeSearch = search && (search.toUpperCase() || '');
        if (!safeSearch) {
          return list;
        }

        return list.filter((startup) => {
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

      filterByCategory(list, categories) {
        if (!Array.isArray(categories) || categories.length === 0) {
          return list;
        }

        return list.filter((startup) => {
          let clearTags = [];
          if (startup.Tag) {
            clearTags = startup.Tag.map(item => item.name);
          }

          for (let i = 0; i < categories.length; i += 1) {
            if (!clearTags || !this.inArray(clearTags, categories[i])) {
              return false;
            }
          }

          return true;
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
