<template>
  <v-card light :hover="true" class="box-shadow light-border custom-hover">
    <!-- <div @click="show = !show"> -->
    <div @click="goToPerson(id)">
      <div class="card-user-pic" :style="{backgroundImage: 'url('+ pic +')'}">
      </div>
      <div class="headline">{{ name }}</div>
      <span class="grey--text one-line">
        {{ role }} @
        <!-- <router-link :to="{name: 'startup', params: {startupId: company_id}}"> -->
          {{ company }}
        <!-- </router-link> -->
      </span>
    </div>

    <v-card-title primary-title>
      <div class="card-user-info">
        <h4>
          <span v-for="(ability, index) in expertise"
            :key="ability">{{ (index !== 0) ? ', ' + ability : ability }}
          </span>
        </h4>
        <span class="grey--text">{{ location }}</span>
      </div>
    </v-card-title>

<!--     <v-slide-y-transition>
      <v-card-text v-show="show">
        {{ bio }}
        <div class="person-card-social-icons">
          <a v-if="twitter" :href="twitter" target="_blank" class="person-card-social-icon">
            <img src="img/twitter_64.png" alt="twitter" />
          </a>
          <a v-if="linkedin" :href="linkedin" target="_blank" class="person-card-social-icon">
            <img src="img/linkedin_64.png" alt="linkedin" />
          </a>
        </div>
      </v-card-text>
    </v-slide-y-transition> -->
  </v-card>
</template>


<style type="text/css">
.v-card {
  border-radius: 8px;
  padding: 4px;
  text-align: center;
}

.v-card__media__content {
  padding: 16px 8px 8px 8px;
  text-align: center;
  flex-direction: column;
}

.card-user-pic {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  height: calc(100vw - 32px);
  margin-bottom: 12px;
}

/* In tablet, we have two columns */
@media (min-width: 600px) {
  .card-user-pic {
    height: calc(50vw - 32px);
  }
}

/* In desktop, we have three columns */
@media (min-width: 960px) {
  .card-user-pic {
    height: calc(33vw - 64px);
  }
}

/* In long-desktop, we have four columns */
@media (min-width: 1264px) {
  .card-user-pic {
    height: calc(25vw - 80px);
  }
}

/* In TV, we have six columns */
@media (min-width: 1904px) {
  .card-user-pic {
    height: calc(16vw);
  }
}

.card-user-info {
  text-align: center;
  width: 100%;
}

.person-card-social-icons {
  text-align: center;
}

.person-card-social-icon {
  display: inline-block;
  padding: 0 8px;
}

.person-card-social-icon img {
  height: 32px;
  width: 32px;
}

.light-border {
  border: 1px solid #f3f3f3;
  border-radius: 6px;
}

/* more spread, low contrast */
.custom-hover:hover {
  box-shadow: 0 4px 12px 0px rgba(0,0,0,.108) !important;
}

.box-shadow {
  box-shadow: 0px 8px 24px 8px rgba(0,0,0,0.04) !important;
}

.v-card {
  padding: 0px;
}

.card-user-pic {
  border-radius: 6px 6px 0px 0px;
}
</style>


<script>
export default {
  name: 'PersonCard',
  props: {
    id: { type: String, required: true },
    pic: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    expertise: { type: Array, required: true },
    bio: { type: String, required: false },
    location: { type: String, required: false },
    twitter: { type: String, required: false },
    linkedin: { type: String, required: false },
  },

  data: () => ({
    show: false,
  }),

  methods: {
    goToPerson: (id) => {
      this.$ga.event('directory_list', 'view_person', id);
      this.$router.push({ name: 'personDetail', params: { id } });
    },
  },
};
</script>
