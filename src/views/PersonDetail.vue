<template>
  <v-card light class="full-size">
    <v-toolbar>
      <v-btn icon @click="$router.back();">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title></v-toolbar-title>
      <v-spacer></v-spacer>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLScaem-y35W3AJeuUAeviZEkqecG98fDOBQErBw0UzJqKsa06g/viewform" target="_blank">
          <v-btn depressed color="primary" class="custom-button">Update this profile</v-btn>
        </a>
    </v-toolbar>

    <div>
      <div class="card-user-pic" :style="{backgroundImage: 'url('+ data.pic +')'}">
      </div>
      <div class="headline text-xs-center">{{ data.name }}</div>
      <div class="text-xs-center">
        <span class="grey--text one-line text-xs-center">
          {{ data.role }} @
          <span v-if="data.company_id" @click="$ga.event('person_detail', 'view_startup', data.company_id)">
            <router-link :to="{name: 'startupDetail', params: {id: data.company_id}}">
              {{ data.company }}
            </router-link>
          </span>
          <span v-else="data.company_id"><!-- @click="$ga.event('person_detail', 'view_org', data.company_id)"> -->
            <!-- <router-link :to="{name: 'orgDetail', params: {id: data.company_id}}"> -->
              {{ data.company }}
            <!-- </router-link> -->
          </span>
        </span>
      </div>
    </div>

    <v-card-title primary-title>
      <div class="card-user-info">
        <h4>
          <span v-for="(ability, index) in data.expertise"
            :key="ability">{{ (index !== 0) ? ', ' + ability : ability }}
          </span>
        </h4>
        <span class="grey--text">{{ data.location }}</span>
      </div>
    </v-card-title>

    <v-card-text>
      {{ data.bio }}
      <div class="person-card-social-icons">
        <a v-if="data.twitter"
          :href="data.twitter"
          target="_blank"
          class="person-card-social-icon"
          @click="$ga.event('person_detail', 'twitter', data._id)"
        >
          <img src="img/twitter_64.png" alt="twitter" />
        </a>
        <a v-if="data.linkedin"
          :href="data.linkedin"
          target="_blank"
          class="person-card-social-icon"
          @click="$ga.event('person_detail', 'linkedin', data._id)"
        >
          <img src="img/linkedin_64.png" alt="linkedin" />
        </a>
        <a v-if="data.slack"
          :href="data.slack"
          target="_blank"
          class="person-card-social-icon"
          @click="$ga.event('person_detail', 'slack', data._id)"
        >
          <img src="img/slack_64.png" alt="slack" />
        </a>
      </div>
    </v-card-text>

  </v-card>
</template>


<style scoped>

  .full-size {
    border-radius: 0 !important;
    border-top-left-radius: 0;
    border-top-right-radius-radius: 0;
  }

    .card-user-pic {
        border-radius: 0px;
    }

    .v-toolbar {
        background-color: transparent;
        box-shadow: none;
    }

    .v-toolbar__title {
        width: 80%;
        text-align: center;
        margin: 0px;
    }

    .headline {
        margin-top: 12px;
    }

    .v-btn--icon {
      min-width: 36px;
    }

    @media (min-width: 600px) {

        .card-user-pic {
            max-height: 370px;
            max-width: 370px;
            margin-left: auto;
            margin-right: auto;
        }

    }

    @media (max-width: 960px) {

        .v-toolbar__content>:first-child.v-btn--icon, .v-toolbar__extension>:first-child.v-btn--icon {
            margin-left: 0px;
        }

    }

</style>

<style>

    .custom-button {
        border-radius: 50px;
        padding: 0px 40px;
        text-transform: none;
    }

</style>


<script>
// ToDo (@CodingCarlos):
// A better way to manage the ID discovery

// If you want to make data persistent throught sessions, you can use localStorage
const storage = window.sessionStorage;

function getStorage() {
  let list = storage.getItem('people-list');
  try {
    list = JSON.parse(list);
  } catch (e) {
    list = [];
  }

  return list;
}

function searchPerson(list, id) {
  for (let i = list.length - 1; i >= 0; i--) {
    if (list[i]._id === id) {
      return list[i];
    }
  }

  return null;
}

function getData() {
  const id = this.$router.currentRoute.params.id;
  const data = getStorage();

  const gottenData = searchPerson(data, id);

  // Check organizaion or startup
  if (gottenData.company_id.indexOf('org') > -1) {
    gottenData.company_id = null;
  }
  console.log(gottenData.company_id);

  this.id = id;
  this.data = gottenData;

  console.log(this.data);
}

export default {
  name: 'PersonDetail',
  data() {
    return {
      loading: true,
      id: null,
      data: {},
      getData,
    };
  },
  created() {
    this.getData();
  },
};
</script>
