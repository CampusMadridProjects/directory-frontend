<template>
  <v-card light :hover="true" class="ma-1 pb-1 light-border custom-hover card-elements ellipsis">
    <!--  -->
    <div @click="goToPerson(id)">
      <v-responsive
      class="card-user-pic"
      :aspect-ratio="1/1"
      :style="{backgroundImage: 'url('+ pic +'), url(img/nopic.png)'}">
      </v-responsive>
      <!-- For hire chip -->
      <!-- <v-chip color="white" class="elevation-1 ml-3" style="margin-top: -56px;">
      <v-avatar class="mr-0">
      <v-icon>🦄</v-icon>
      </v-avatar>
      <span class="ml-0">Available for hire</span>
      </v-chip> -->
      <!-- For hire chip -->
      <!-- Name and role -->
      <div style="padding: 8px 16px 0px 12px;">
        <div class="headline ellipsis">
          <person-fullname :name="name" :surname="surname" />
        </div>
        <div class="ellipsis">
          <span class="one-line">
            {{ role }}
            <span v-if="role && company">at</span>
            <!-- <span v-else>-</span> -->
            {{ company }}
            &nbsp;
          </span>
        </div>
      </div>
      <!-- /Name and role -->
    </div>
    <!-- / -->
    <!-- Location -->
    <div v-if="config.hasLocation" class="pa-2">
      <v-icon size="14" color="#7a7a7a" class="mr-1">room</v-icon>
      <span>{{ location || 'Community' }}</span>
    </div>
    <!-- /Location -->
    <!--  -->
    <div primary-title @click="goToPerson(id)" class="ml-1 mb-1">
      <!-- <v-icon
      v-if="expertise.length > 0"
      size="14"
      class="mr-1"
      color="black"
      >
      local_offer
      </v-icon>
      <span v-else>&nbsp;</span> -->
      <v-chip class="mr-0" color="#f0f0f0" v-for="(ability, index) in expertise"
      :key="ability.id">{{ (index !== 0) ?'' + ability.name : ability.name }}
      </v-chip>
    </div>
    <!-- / -->
  </v-card>
</template>

<style type="text/css">

  .v-card {
    border-radius: 8px;
    padding: 4px;
    text-align: left;
    width: 100%;
  }

  .card-elements {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .card-user-info {
    text-align: left;
    width: 100%;
  }

  .headline {
    font-weight: bold !important;
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
  }

  /* more spread, low contrast */
  .custom-hover:hover {
    box-shadow: 0 4px 8px 0px rgba(0,0,0,.10) !important;
  }

  .box-shadow {
    box-shadow: 0px 8px 8px 2px rgba(0,0,0,0.08) !important;
  }

  .v-card {
    padding: 0px;
  }

  .card-user-pic {
    border-radius: 6px 6px 0px 0px;
  }

</style>

<style scoped>
.v-icon {
  vertical-align: text-top;
  font-size: 16px !important;
}
>>> .v-chip .v-chip__content {
  height: 24px;
}
.headline {
  font-size: 1.2rem !important;
  line-height: 1.5 !important;
}
</style>

<script>
import PersonFullname from '@/components/PersonFullname.vue';

export default {
  name: 'PersonCard',
  components: {
    PersonFullname,
  },
  props: {
    id: { type: String, required: true },
    pic: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: false, default: '' },
    role: { type: String, required: false },
    company: { type: String, required: false },
    expertise: { type: Array, required: false },
    bio: { type: String, required: false },
    location: { type: String, required: false },
    twitter: { type: String, required: false },
    linkedin: { type: String, required: false },
  },

  data: () => ({
    show: false,
  }),

  computed: {
    config() {
      return this.$store.state.config.config;
    },
  },

  methods: {
    goToPerson(id) {
      this.$ga.event('directory_list', 'view_person', id);
      this.$router.push({ name: 'personDetail', params: { id } });
    },
  },
};
</script>
