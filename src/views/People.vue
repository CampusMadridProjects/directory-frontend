<template>
  <v-container v-if="filterPeople(search).length === 0">
    <h1>No hemos encontrado resultados :(</h1>
  </v-container>
  <v-container class="card-grid" v-else>
    <v-flex xs12 sm6 md4 lg3 xl2 class="card-grid-item"  v-for="person in filterPeople(search)" :key="person._id">
      <person-card class="card-grid-item-card" :name="person.name" :pic="person.pic" :role="person.role" :company="person.company" :expertise="person.expertise" :bio="person.bio" :location="person.location" :twitter="person.twitter" :linkedin="person.linkedin"></person-card>
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
import PersonCard from './PersonCard.vue'

export default {
  name: 'People',
  props: {
    search: { type: String, required: false }
  },
  data () {
    return {
      list: [],
      filterPeople: function (search) {
        var safeSearch = search && search.toUpperCase() || '';
        return this.list.filter(function (person) {
          var found = false;

          // Validate vulnerable data
          if (typeof person.location === 'number') {
            person.location = 'L'+person.location;
          }

          if( (person.name && person.name.toUpperCase().indexOf(safeSearch) > -1)
            || (person.bio && person.bio.toUpperCase().indexOf(safeSearch) > -1)
            || (person.location && person.location.toUpperCase().indexOf(safeSearch) > -1)
            || (person.company && person.company.toUpperCase().indexOf(safeSearch) > -1)
            || (person.expertise && inArray(person.expertise, safeSearch))
            ) {
            found = true;
          }

          return found;
        })
      },
      loadPeople: function () {
        fetch(process.env.VUE_APP_API_URL + '/' + process.env.VUE_APP_API_PEOPLE, {
          method: 'GET',
          // body:JSON.stringify({title:"a new todo"})
        }).then((res) => res.json())
        .then( (data) => {
          // console.log(data);
          this.list = data;
        })
        .catch((err) => {
          console.error(err)
        });
      }
    }
  },
  components: {
    PersonCard: PersonCard
  },
  created: function () {
    this.loadPeople();
  }
}

function inArray(array, data) {
  var found = false;
  for (var i = array.length - 1; i >= 0; i--) {
    if (array[i].toUpperCase().indexOf(data) > -1) {
      found = true
    }
  }

  return found;
}
</script>
