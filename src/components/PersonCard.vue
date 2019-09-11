<template>
  <v-card light :hover="true" class="box-shadow light-border custom-hover card-elements">
    <div @click="goToPerson(id)">
      <div class="card-user-pic" :style="{backgroundImage: 'url('+ pic +'), url(/img/nopic.png)'}">
      </div>
      <div style="padding: 8px 24px;">
        <div class="headline">{{ name }}</div>
        <span class="one-line">
          {{ role }}
          <span v-if="role && company">@</span>
          <span v-else>-</span>
          {{ company }}
        </span>
      </div>
    </div>

    <v-card-title primary-title>
      <div class="card-user-info">
        <h4>
          <span v-for="(ability, index) in expertise"
            :key="ability.id">{{ (index !== 0) ? ', ' + ability.name : ability.name }}
          </span>
        </h4>
        <span>{{ location }}</span>
      </div>
    </v-card-title>
  </v-card>
</template>


<style type="text/css">
    .v-card {
      border-radius: 8px;
      padding: 4px;
      padding-bottom: 8px !important;
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
    
    .v-card__title--primary {
        padding: 8px 24px;
    }
    
    .headline {
        font-size: 21px;
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

/* In long-desktop, we have five columns */
@media (min-width: 1264px) {
  .card-user-pic {
    height: calc(20vw - 80px);
  }
}

/* In TV, we have six columns */
@media (min-width: 1904px) {
  .card-user-pic {
    height: calc(16vw);
  }
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
  border: 1px solid #eaeaea;
  border-radius: 6px;
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


<script>
export default {
  name: 'PersonCard',
  props: {
    id: { type: String, required: true },
    pic: { type: String, required: true },
    name: { type: String, required: true },
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
    goToPerson(id) {
      this.$ga.event('directory_list', 'view_person', id);
      this.$router.push({ name: 'personDetail', params: { id } });
    },
  },
};
</script>
