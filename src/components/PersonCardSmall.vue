<template>
  <v-card light :hover="true" class="custom-hover py-2">
    <v-list-tile class="pl-0 pr-0" @click="goToPerson(id)">
      <div>
        <v-list-tile-avatar :style="{backgroundImage: 'url('+ pic +'), url(img/nopic.png)'}">
        </v-list-tile-avatar>
      </div>
      <div class="person-info pl-3">
        <v-list-tile-title class="text-xs-left">
          <person-fullname :name="name" :surname="surname" />
        </v-list-tile-title>
        <v-list-tile-sub-title class="text-xs-left">
          {{ role }}
          <span v-if="role && company">at</span>
          <!-- <router-link :to="{name: 'startup', params: {startupId: company_id}}"> -->
            {{ company }}
          <!-- </router-link> -->
        </v-list-tile-sub-title>
        <div class="ellipsis">
          <v-chip class="ma-0 mt-1 mr-1" color="#f0f0f0" v-for="(ability, index) in expertise"
            :key="ability.id">{{ (index !== 0) ? '' + ability.name : ability.name }}</v-chip>
        </div>
      </div>
    </v-list-tile>
  </v-card>
</template>

<style scoped>

  /* fix ellipsis problem with skill chips */
  .v-chip {
    display: inline-grid;
  }

  >>> .v-chip .v-chip__content {
    height: 24px;
    font-size: 16px;
    /* font-weight: 500; */
  }

  .v-list__tile__title {
    font-weight: bold;
    font-size: 1.4rem;
  }

  .custom-hover:hover {
    box-shadow: none !important;
    background: #f5f5f5 !important;
  }

  /* styles card height  */
  >>> .v-list__tile {
    height: auto;
  }
  .v-card {
    border-radius: 0px;
  }
</style>

<style>

.v-card {
    box-shadow: none;
}

/* more spread, low contrast */
.custom-hover:hover {
  box-shadow: 0 4px 12px 0px rgba(0,0,0,.108);
}

.v-list__tile__title {
  font-size: 21px;
}

/* avoids layout breaking */
.person-info {
  max-width: 81%;
}

.v-list__tile__action, .v-list__tile__avatar {
  min-width: 80px;
  min-height: 80px;
  background-position: center;
  background-size: cover;
  border-radius: 50px;
}

.v-list__tile__sub-title {
  font-size: 1.2rem;
  font-weight: 500;
}

</style>

<script>
import PersonFullname from '@/components/PersonFullname.vue';

export default {
  name: 'PersonCardSmall',
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

  methods: {
    goToPerson: function goToPerson(id) {
      this.$ga.event('directory_list', 'view_person', id);
      this.$router.push({ name: 'personDetail', params: { id } });
    },
  },
};
</script>
