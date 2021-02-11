<template>
  <v-card light :hover="true" class="custom-hover" @click="goToPerson(id)">
    <v-list three-line class="py-2">
      <v-list-tile>
        <v-list-tile-avatar
          :style="{backgroundImage: 'url('+ pic +'), url(img/nopic.png)'}"
          class="mx-2 avatar"
        >
        </v-list-tile-avatar>
        <v-list-tile-content>
          <div class="pr-4">
            <v-list-tile-title>
              <person-fullname :name="name" :surname="surname" />
            </v-list-tile-title>
            <v-list-tile-sub-title class="text-xs-left">
              {{ role }}
              <span v-if="role && company">at</span>
              <!-- <router-link :to="{name: 'startup', params: {startupId: company_id}}"> -->
              {{ company }}
              <!-- </router-link> -->
            </v-list-tile-sub-title>
          </div>
          <div class="ellipsis my-1">
            <v-chip class="ma-0 mt-1 mr-1" color="#f0f0f0" v-for="(ability, index) in expertise"
              :key="ability.id">{{ (index !== 0) ? '' + ability.name : ability.name }}
            </v-chip>
          </div>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-divider inset></v-divider>
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
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 1.6rem;
    letter-spacing: .016rem;
  }

  .custom-hover:hover {
    box-shadow: none !important;
    background: #f5f5f5 !important;
  }

  /* styles card height  */
  >>> .v-list__tile {
    height: auto;
    padding: 0px;
  }
  .v-card {
    border-radius: 0px;
  }
</style>

<style>

>>> .theme--light.v-divider {
  border-color: #eaeaea;
}

.v-card {
    box-shadow: none;
}

/* more spread, low contrast */
.custom-hover:hover {
  box-shadow: 0 4px 12px 0px rgba(0,0,0,.108);
}

/* avoids layout breaking */
.person-info {
  max-width: 81%;
}

.avatar {
  background-position: center;
  background-size: cover;
  border-radius: 4px;
  margin-top: 0px !important;
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  min-width: 5rem;
}

.v-list__tile__sub-title {
  font-size: 1.2rem;
  line-height: 1.4rem;
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
