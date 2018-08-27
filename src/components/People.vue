<template>
  <v-container v-if="loading === true">
    <loading></loading>
  </v-container>
  <v-container v-else-if="filterPeople(search).length === 0">
    <h1>No hemos encontrado resultados :(</h1>
  </v-container>
  <v-container class="card-grid" v-else>
    <v-flex xs12 sm6 md4 lg3 xl2 class="card-grid-item"
      v-for="person in filterPeople(search)"
      :key="person._id">
      <person-card class="card-grid-item-card"
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
import PersonCard from './PersonCard.vue';
import Loading from './Loading.vue';

// If you want to make data persistent throught sessions, you can use localStorage
const storage = window.sessionStorage;

function inArray(array, data) {
  let found = false;
  for (let i = array.length - 1; i >= 0; i -= 1) {
    if (array[i].toUpperCase().indexOf(data) > -1) {
      found = true;
    }
  }

  return found;
}

/** filterPeople
 *  Given a search term, return an array with only the people that matches in
 *  any way with the term.
 *
 *  @param {string} search Search query to filter persons
 *  @return {array} An array that matches the requested search term
 */
function filterPeople(search) {
  const safeSearch = search && (search.toUpperCase() || '');
  return this.list.filter((person) => {
    let found = false;

    if ((person.name && person.name.toUpperCase().indexOf(safeSearch) > -1)
      || (person.bio && person.bio.toUpperCase().indexOf(safeSearch) > -1)
      || (person.location && person.location.toUpperCase().indexOf(safeSearch) > -1)
      || (person.company && person.company.toUpperCase().indexOf(safeSearch) > -1)
      || (person.expertise && inArray(person.expertise, safeSearch))
    ) {
      found = true;
    }

    return found;
  });
}

/** loadPeople
 *  Get a people list from localstorage or backend.
 */
function loadPeople() {
  const localPeople = storage.getItem('people-list');

  if (localPeople === null) {
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
}

/** downloadPeople
 *  Get a people list from the backend. Also, parse some possible exceptions.
 */
function downloadPeople() {
  return fetch(`${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_API_PEOPLE}`, {
    method: 'GET',
    // body:JSON.stringify({title:"a new todo"})
  }).then(res => res.json())
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

      return cleanData;
    })
    .catch((err) => {
      this.loading = false;
      console.error(err);
    });
}


export default {
  name: 'People',
  props: {
    search: { type: String, required: false },
  },
  data() {
    return {
      loading: true,
      list: [],
      filterPeople,
      loadPeople,
      downloadPeople,
    };
  },
  components: {
    PersonCard,
    Loading,
  },
  created() {
    this.loadPeople();
  },
};
</script>
