<template>
  <v-card light class="full-size">
    <v-toolbar>
      <v-btn fab @click="$router.replace('/directory');">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title></v-toolbar-title>
      <v-spacer></v-spacer>
        <a :href="'/admin/#/suggest-person-public/'+ id"
          target="_blank"
          class="no-underline"
        >
            <v-btn fab class="mx-0">
              <v-icon>edit</v-icon>
            </v-btn>
        </a>
    </v-toolbar>

    <div v-if="loading" class="mt-5 pt-5">
      <loading></loading>
    </div>

    <div v-else>
      <div>
        <div class="card-user-pic"
          :style="{backgroundImage: 'url('+ data.pic +'), url(/img/nopic.png)'}"
        >
        </div>
        <div style="padding: 8px 24px;">
          <div class="headline">{{ data.name }}</div>
          <div>
              <span class="one-line">
                {{ job.role }}
                <span v-if="job.role && job.name">@</span>
                <span v-else>-</span>
            <span
              v-if="job.id"
              @click="$ga.event('person_detail', 'view_startup', job.id)"
            >
              <router-link :to="{name: 'startupDetail', params: {id: job.id}}">
                {{ job.name }}
              </router-link>
            </span>
              </span>
          </div>
        </div>
      </div>

      <v-card-title primary-title>
        <div class="card-user-info">
          <h4>
           <v-icon size="14" class="mr-1">forum</v-icon>
            <span v-for="(ability, index) in data.Tag"
              :key="ability.id">{{ (index !== 0) ? ', ' + ability.name : ability.name }}
            </span>
          </h4>
          <v-icon size="14" class="mr-1">room</v-icon>
          <span>{{ data.location }}</span>
        </div>
      </v-card-title>

      <v-card-text>
        {{ data.bio }}
        <div class="mb-3">
          <v-btn color="primary" x-large v-if="data.slack"
            :href="slackUrl(data.slack)"
            target="_blank"
            @click="$ga.event('person_detail', 'connect', data._id)"
          >
            Connect
          </v-btn>
          <v-btn color="primary" x-large v-else-if="data.linkedin"
            :href="data.linkedin"
            target="_blank"
            @click="$ga.event('person_detail', 'connect', data._id)"
          >
            Connect
          </v-btn>
          <v-btn color="primary" x-large v-else-if="data.twitter"
            :href="data.twitter"
            target="_blank"
            @click="$ga.event('person_detail', 'connect', data._id)"
          >
            Connect
          </v-btn>
        </div>

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
            :href="slackUrl(data.slack)"
            target="_blank"
            class="person-card-social-icon"
            @click="$ga.event('person_detail', 'slack', data._id)"
          >
            <img src="img/slack_64.png" alt="slack" />
          </a>
        </div>
      </v-card-text>
    </div>

  </v-card>
</template>

<style>
  .v-btn {
    text-transform: none;
  }
</style>

<style scoped>
.card-user-pic {
  height: calc(43vw - 64px);
  margin-bottom: 0px;
}

/* makes cta full width */
.primary {
  width: 96%;
}

.v-toolbar {
  margin-bottom: -64px;
}

.v-toolbar__content button {
  width: 45px;
}

.full-size {
  border-radius: 0 !important;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  height: auto;
}

.card-user-pic {
  border-radius: 0px;
}

.v-toolbar {
  background-color: transparent;
  box-shadow: none;
}

.v-toolbar .v-btn {
  background: rgba(0, 0, 0, 0.4) !important;
  color: white !important;
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
  nav {
    margin-bottom: -64px;
  }

  .v-btn--floating {
    width: 45px;
  }

  .v-card-text .v-btn {
    width: 100%;
  }

  .card-user-pic {
    height: calc(66vh - 64px);
  }
}
</style>

<script>
import Loading from '@/components/Loading.vue';

export default {
  name: 'PersonDetail',
  components: {
    Loading,
  },
  data: () => ({
    loading: true,
    id: null,
    data: null,
  }),
  computed: {
    job() {
      let job = {};
      if (this.data.Group && this.data.Group.length > 0) {
        [job] = this.data.Group;
      }

      return job;
    },
  },
  methods: {
    slackUrl(id) {
      const team = process.env.VUE_APP_SLACK_TEAM;
      return `https://${team}.slack.com/team/${id}`;
      // const team = process.env.VUE_APP_SLACK_ID;
      // return `slack://user?team=${team}&id=${id}`;
    },
    getData() {
      // console.log('getting data...');
      this.data = this.$store.getters['people/getById'](this.id);
      if (this.data != null) {
        this.loading = false;
      }
    },
  },
  created() {
    this.id = this.$router.currentRoute.params.id;

    if (this.$store.state.people.list.length > 0) {
      this.getData();
    } else {
      this.$store.dispatch('people/getPeople')
        .then(this.getData);
    }
  },
};
</script>
