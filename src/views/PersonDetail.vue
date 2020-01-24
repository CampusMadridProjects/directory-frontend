<template>

  <v-card light class="full-size">

    <!-- Actions -->
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
    <!-- /Actions -->
    
    <!-- Loading -->
    <div v-if="loading" class="mt-5 pt-5">
      <loading></loading>
    </div>
    <!-- /Loading -->

    <div v-else>
      <!-- User picture, name, job title and bio -->
      <div>
        <!-- User picture -->
        <div class="card-user-pic" :style="{backgroundImage: 'url('+ data.pic +'), url(/img/nopic.png)'}"></div>
        <!-- /User picture -->
        <!-- Profile info container -->
        <div style="padding: 8px 24px;">
          <!-- Name and surname -->
          <div class="headline">{{ data.name }} {{ data.surname }}</div>
          <!-- /Name and surname -->
          <!-- Job title and company -->
          <div>
            <span class="one-line job">
              {{ job.role }}
              <span v-if="job.role && job.name">@</span>
              <!-- No company
              <span v-else>-</span>
              /No company -->
              <!-- Company name -->
              <span
              v-if="job.id"
              @click="$ga.event('person_detail', 'view_startup', job.id)">
                <router-link :to="{name: 'startupDetail', params: {id: job.id}}">
                {{ job.name }}
                </router-link>
              </span>
              <!-- /Company name -->
            </span>
          </div>
          <!-- /Job title and company -->
          <!-- Bio -->
          {{ data.bio }}
          <span class="bio">Entrepreneur with more than 2.500 years of experience dedicated to help everyone build stuff in less than 5 years</span>
          <!-- /Bio -->
        </div>
        <!-- /Profile info container -->
      </div>
      <!-- /User picture, name, job title and bio -->
      <!-- Location -->
      <v-card-title primary-title>
        <!-- User info -->
        <div class="location" v-if="data.location">
          <v-icon size="14" class="mr-1">room</v-icon>
          <span>{{ data.location }}</span>
        </div>
        <!-- /User info -->
      </v-card-title>
      <!-- /Location -->
      <!-- Knows about -->
      <v-card-title primary-title>
        <!-- User info -->
        <div class="card-user-info">
          <!-- Tags and location -->
          <span>Knows about</span>
          <h4>
            <span v-for="(ability, index) in data.Tag" :key="ability.id">{{ (index !== 0) ? ', ' + ability.name : ability.name }}</span>
          </h4>
          <!-- Tags and location -->
        </div>
        <!-- /User info -->
      </v-card-title>
      <!-- /Knows about -->
      <!-- Needs help with -->
      <v-card-title primary-title>
        <!-- User info -->
        <div class="card-user-info">
          <span>Needs help with</span>
          <h4>
            <span v-for="(ability, index) in data.Tag" :key="ability.id">{{ (index !== 0) ? ', ' + ability.name : ability.name }}</span>
          </h4>
          <!-- Tags and location -->
        </div>
        <!-- /User info -->
      </v-card-title>
      <!-- /Needs help with -->
      <!-- Connect options -->
      <div class="px-3 my-2 bottom-cta">
          <v-btn color="primary" x-large v-if="connect.show"
            :href="connect.url"
            target="_blank"
            @click="$ga.event('person_detail', 'connect', data._id)"
          >
            Connect via {{connect.media}}
          </v-btn>
          <!-- 
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
          </v-btn> -->
        </div>
      <div class="px-4 my-3">
        <h4>Social profiles</h4>
        <div class="person-card-social-icons">
          <a v-if="data.instagram"
            :href="data.instagram"
            target="_blank"
            class="person-card-social-icon"
            @click="$ga.event('person_detail', 'instagram', data._id)"
          >
            <img src="img/instagram_64.png" alt="instagram" />
            <span>Instagram</span>
          </a>
          <a v-if="data.twitter"
            :href="data.twitter"
            target="_blank"
            class="person-card-social-icon"
            @click="$ga.event('person_detail', 'twitter', data._id)"
          >
            <img src="img/twitter_64.png" alt="twitter" />
            <span>Twitter</span>
          </a>
          <a v-if="data.linkedin"
            :href="data.linkedin"
            target="_blank"
            class="person-card-social-icon"
            @click="$ga.event('person_detail', 'linkedin', data._id)"
          >
            <img src="img/linkedin_64.png" alt="linkedin" />
            <span>LinkedIn</span>
          </a>
          <a v-if="data.slack"
            :href="slackUrl(data.slack)"
            target="_blank"
            class="person-card-social-icon"
            @click="$ga.event('person_detail', 'slack', data._id)"
          >
            <img src="img/slack_64.png" alt="slack" />
            <span>Slack</span>
          </a>
        </div>
      </div>
      <!-- /Connect options -->
    </div>

  </v-card>

</template>

<style>
  /* */
  .v-btn {
    text-transform: none;
  }
  /* adds space between job title and bio */
  .job {
    display: block;
    margin-bottom: 8px;
  }
  /* fixes connect bottom position */
  .bottom-cta {
    bottom: 0px;
    position: fixed;
    width: 360px;
  }
  .v-toolbar__content {
    padding: 0 16px;
  }
  /* removes underline from links */
  a  {
    text-decoration: none;
  }
  
  /*  */
  .person-card-social-icons {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
  }
  
  .person-card-social-icon {
    display: inline-block;
    padding: 0 8px;
    display: flex;
    align-content: center;
    margin: 4px 0px;
    background: #fafafa;
    padding: 8px;
    color: black;
    align-items: center;
    border-radius: 4px;
  }

  .person-card-social-icon img {
    height: 32px;
    width: 32px;
    margin-right: 8px;
    border-radius: 50px;
  }


  @media screen and (max-width: 768px) {
    .bottom-cta {
      width: 100%;
    }
    .v-toolbar {
      width: 100% !important;
    }
    /* makes profile CTA bigger */
    .bottom-cta .v-btn {
      height: 56px;
      font-size: 1.4rem;
    }
    /* */
    .headline {
      font-size: 2rem !important;
    }
    .job {
      font-size: 1.4rem;
    }
  }
</style>

<style scoped>
  
  .v-toolbar {
    position: fixed;
    width: 360px;
  }
  
  .full-size {
    padding-bottom: 20%;
  }
  
  .v-card__title--primary {
    padding: 4px 24px;
  }
  
  .location {
    margin-bottom: 8px;
  }
  
  .card-user-info {
    text-align: left;
    width: 100%;
    background: #fafafa;
    padding: 8px;
    border-radius: 4px;
  }
  
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
    margin-top: 8px;
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
      height: calc(56vh - 64px);
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
    slackTeam() {
      return this.$store.getters['settings/slackWorkspace'] || '';
    },
    connect() {
      let connectData = {
        show: true,
        media: '',
        url: '',
      };

      if (this.data.slack) {
        connectData.media = 'Slack';
        connectData.url = this.slackUrl(this.data.slack);
      } else if (this.data.linkedin) {
        connectData.media = 'Linkedin';
        connectData.url = this.data.linkedin;
      } else if (this.data.twitter) {
        connectData.media = 'Twitter';
        connectData.url = this.data.twitter;
      } else if (this.data.instagram) {
        connectData.media = 'Instagram';
        connectData.url = this.data.instagram;
      } else {
        connectData.show = false;
      }

      return connectData;
    }
  },
  methods: {
    slackUrl(id) {
      return `https://${this.slackTeam}.slack.com/team/${id}`;
    },
    getData() {
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
