<template>

  <v-card light class="full-size">

    <!-- Actions -->
    <v-toolbar>
      <v-btn fab small @click="$router.replace('/directory');" class="elevation-2">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <!-- <v-toolbar-title></v-toolbar-title> -->
      <v-spacer></v-spacer>
      <a :href="'/admin/#/suggest-person-public/'+ id"
        class="no-underline"
      >
        <v-btn fab small class="ma-0 elevation-2">
          <v-icon>edit</v-icon>
        </v-btn>
      </a>
    </v-toolbar>
    <!-- /Actions -->

    <!-- Loading -->
    <div v-if="loading">
      <loading></loading>
    </div>
    <!-- /Loading -->

    <!-- Content -->
    <div v-else>
      <!-- User picture -->
      <v-card-media>
        <div class="text-xs-center">
          <v-img
            :src="data.pic || 'img/nopic.png'"
            class="startup-logo"
            aspect-ratio="1"
          />
        </div>
      </v-card-media>
      <!-- /User picture -->
      <!-- Profile info container -->
      <div class="text-xs-left">
        <div class="container-1 pt-3 pb-2 px-4">
          <!-- Name and surname -->
          <div class="headline mt-1">
            {{ data.name }} {{ data.surname }}
          </div>
          <!-- /Name and surname -->
          <!-- Job title and company -->
          <div>
            <span class="one-line job title">
              {{ job.role }}
              <span v-if="job.role && job.name">at</span>
              <!-- No company
              <span v-else>-</span>
              /No company -->
              <!-- Company name -->
              <span
              v-if="job.id"
              @click="$ga.event('person_detail', 'view_startup', job.id)">
                <router-link :to="{ name: 'startupDetail', params: { id: job.id } }">
                {{ job.name }}
                </router-link>
              </span>
              <!-- /Company name -->
            </span>
          </div>
          <!-- /Job title and company -->
          <!-- Bio -->
          <div class="pt-2">
            <span class="bio subheading">{{ data.bio }}</span>
          </div>
          <!-- /Bio -->
          <!-- CTA -->
          <div class="pa-0 mt-2 bottom-cta" v-if="config.emailConnect === true">
            <send-mail :id="data.id" />
          </div>
          <div v-else class="pa-0 my-2 bottom-cta">
            <v-btn
              color="primary"
              x-large
              v-if="connect.show"
              :href="connect.url"
              target="_blank"
              @click="$ga.event('person_detail', 'connect', data._id)"
              class="elevation-0 br-6"
            >
              Connect via {{ connect.media }}
            </v-btn>
          </div>
          <!-- /CTA -->
          <!-- Memberships -->
          <v-layout align-star justify-start row wrap class="pb-1">
            <v-flex v-if="config.hasProgram && data.program" grow>
              <!-- Program -->
              <v-chip class="d-flex" color="grey lighten-4">
                <div class="location">
                  <v-icon size="14" class="mr-1">supervised_user_circle</v-icon>
                  <!-- <span>{{ data.program }}</span> -->
                  <span>Tetuan Valley</span>
                </div>
              </v-chip>
            </v-flex>
            <!-- /Program -->
            <!-- Location -->
            <v-flex v-if="config.hasLocation && data.location" grow>
              <v-chip class="d-flex" color="grey lighten-4">
                <div class="location">
                  <v-icon size="14" class="mr-1">room</v-icon>
                  <span>{{ data.location }}</span>
                </div>
              </v-chip>
            </v-flex>
            <!-- /Location -->
            <!-- Membership dates -->
            <v-flex v-if="config.hasMembership && memberSince" grow>
              <v-chip  class="d-flex" color="grey lighten-4">
                <div class="location">
                  <v-icon size="14" class="mr-1">calendar_today</v-icon>
                   <span>Member from {{ memberSince }}</span>
                   <span v-if="memberUntil"> to {{ memberUntil }}</span>
                </div>
              </v-chip>
              <!-- /Membership dates -->
            </v-flex>
          </v-layout>
          <!-- /Memberships -->
        </div>
        <!-- Knowledge and interests -->
        <v-divider v-if="skills.length"></v-divider>
        <div class="my-2">
          <!-- Knows about -->
          <v-card-title primary-title v-if="skills.length">
            <!-- User info -->
            <div class="card-user-info">
              <!-- Tags and location -->
              <h2 class="pb-1">Can help you with</h2>
              <v-chip color="grey lighten-4" v-for="(ability, index) in skills" :key="ability.id">{{ (index !== 0) ? '' + ability.name : ability.name }}</v-chip>
              <!-- Tags and location -->
            </div>
            <!-- /User info -->
          </v-card-title>
          <!-- /Knows about -->
          <!-- Needs help with -->
          <v-card-title primary-title v-if="interests.length">
            <!-- User info -->
            <div class="card-user-info">
              <h2 class="pb-1">Would like your help with</h2>
                <v-chip color="grey lighten-4" v-for="(ability, index) in interests" :key="ability.id">{{ (index !== 0) ? '' + ability.name : ability.name }}</v-chip>
              <!-- Tags and location -->
            </div>
            <!-- /User info -->
          </v-card-title>
          <!-- /Needs help with -->
        </div>
        <!-- /Knowledge and interests -->
        <!-- Social profiles -->
        <v-divider></v-divider>
        <social-links
          :data="data"
          :config="config"
          class="px-4 my-3"
        />
        <!-- /Social profiles -->
      </div>
      <!-- /Profile info container -->
    </div>
    <!-- /Content -->

  </v-card>

</template>

<style>

  /* custom border radius */
  .br-6 {
    border-radius: 6px;
  }

  /* prov fix */
  .full-size .v-toolbar {
    z-index: 2;
  }

  /* fix | decreases padding of location and join date */
  .full-size .v-card__title--primary {
    padding: 4px 24px;
  }

  .v-card-text {
    padding: 0px;
  }

  /* */
  .v-btn {
    text-transform: none;
  }

  /* fixes connect bottom position */
  .bottom-cta {
    /*
    bottom: 0px;
    position: fixed;
    */
    width: 100%;
  }
  .bottom-cta a {
    margin: 8px 0px;
  }
  /* reduces toolbar padding */
  .full-size .v-toolbar__content {
    padding: 0 16px;
  }
  /* removes underline from links */
  a  {
    text-decoration: none;
  }

  @media screen and (max-width: 768px) {
    /* changes contact button size in small screens */
    .bottom-cta {
      width: 100%;
    }
    /* changes detail toolbar size in small screens */
    .v-toolbar {
      width: 100% !important;
    }
    /* makes profile CTA taller */
    /*
    .bottom-cta .v-btn {
      height: 56px;
      font-size: 1.4rem;
    }
    */
    /* makes name bigger in full size view */
    .full-size .headline {
      font-size: 2rem !important;
    }
    /* makes job title bigger in full size view */
    .job {
      font-size: 1.4rem;
    }
  }

</style>

<style scoped>

  /* review */
  h2 {
    font-size: 1.4rem;
  }

  /* review */
  .title {
    font-size: 1.2rem !important;
    line-height: 1.4 !important;
    font-weight: normal;
  }

  /* probably not the best solution */
  .v-chip {
    margin-left: 0px;
  }

  /* makes toolbar icons bigger */
  .v-toolbar .v-btn--floating.v-btn--small .v-icon {
      font-size: x-large;
  }

  /* styles for the detail view | repeated in startup detail */
  .full-size {
    border-radius: 0 !important;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    height: auto;
    padding-bottom: 20%;
  } /* startup detail doesn't have padding bottom because it doesn't have a fixed CTA */

  /* makes bottom CTA full width */
  .bottom-cta >>> .v-btn {
    width: 100%;
  }

  .v-btn--icon {
    min-width: 36px;
  }

  /*** TOOLBAR ***/

  /* pulls content under toolbar and removes bg color and shadow */
  .v-toolbar {
    margin-bottom: -64px;
    background-color: transparent;
    box-shadow: none;
    position: fixed;
    width: 360px;
  }

  /* adds shadow to detail toolbar icons */
  .v-toolbar .v-btn {
    background: white !important;
  }

  .v-toolbar__title {
    width: 80%;
    text-align: center;
    margin: 0px;
  }

  /*** /TOOLBAR ***/

  /*** USER STYLES ***/

  /* offers and requests for help */
  .card-user-info {
    text-align: left;
    width: 100%;
    padding: 8px 0px;
    border-radius: 4px;
  }

  .card-user-pic {
    margin-bottom: 0px;
    border-radius: 0px;
  }

  /*** /USER STYLES ***/

  @media (min-width: 600px) {
    /* prevents user/startup pic to break layout in mid-size screens */
    .card-user-pic, .startup-logo {
      max-height: 370px;
      max-width: 370px;
      margin-left: auto;
      margin-right: auto;
    }
  }

  @media (max-width: 960px) {

    /* review */
    h2 {
      font-size: 1.6rem;
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
  import SendMail from '@/components/SendMail.vue';
  import SocialLinks from '@/components/SocialLinks.vue';

  export default {
    name: 'PersonDetail',
    components: {
      Loading,
      SendMail,
      SocialLinks,
    },
    data: () => ({
      loading: true,
      id: null,
      data: null,
    }),
    computed: {
      config() {
        return this.$store.state.config.config;
      },
      job() {
        let job = {};
        if (this.data.Group && this.data.Group.length > 0) {
          [job] = this.data.Group;
        }

        return job;
      },
      skills() {
        return this.typeTags('HAS_SKILL');
      },
      interests() {
        return this.typeTags('HAS_INTEREST');
      },
      memberSince() {
        if (!this.data.memberSince) {
          return null;
        }

        let date = new Date(this.data.memberSince);
        return `${date.getMonth()}/${date.getFullYear()}`;
      },
      memberUntil() {
        if (!this.data.memberUntil) {
          return null;
        }

        let date = new Date(this.data.memberUntil);
        return `${date.getMonth()}/${date.getFullYear()}`;
      },
      connect() {
        let connectData = {
          show: true,
          media: '',
          url: '',
        };

        if (this.data.slack) {
          connectData.media = 'Slack';
          connectData.url = this.$slackUrl(this.data.slack);
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
      },

    },
    methods: {
      getData() {
        this.data = this.$store.getters['people/getById'](this.id);
        if (this.data != null) {
          this.loading = false;
        }
      },
      typeTags(type) {
        if (!this.data.Tag) return [];

        return this.data.Tag.filter(tag => {
          const tagTypes = tag.relations ? tag.relations.map(type => type.toUpperCase()) : [];

          if (tagTypes.indexOf(type) > -1) {
            return true;
          }

          return false;
        });
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
