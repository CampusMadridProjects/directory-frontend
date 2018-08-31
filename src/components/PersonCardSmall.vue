<template>

  <v-card light :hover="true" class="box-shadow light-border custom-hover">
   
<v-list-tile>
   
    <!-- <div @click="show = !show"> -->
    <div @click="$router.push({name: 'personDetail', params: {id: id}})">
      <v-list-tile-avatar :style="{backgroundImage: 'url('+ pic +')'}">
      </v-list-tile-avatar>
    </div>

    <v-card-tile-content>
      <v-list-tile-title>{{ name }}</v-list-tile-title>
      <v-list-tile-sub-title>
        {{ role }} @
        <!-- <router-link :to="{name: 'startup', params: {startupId: company_id}}"> -->
          {{ company }}
        <!-- </router-link> -->
      </v-list-tile-sub-title>

      <div class="card-user-info">
        <h4>
          <span v-for="(ability, index) in expertise"
            :key="ability">{{ (index !== 0) ? '∙ ' + ability : ability }}
          </span>
        </h4>
        <!-- <span class="grey--text">{{ location }}</span> -->
      </div>
    </v-card-tile-content>
    
</v-list-tile>

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
    
    .box-shadow {
        box-shadow: none;
    }

    .light-border {
        border: 1px solid #f3f3f3;
        border-radius: 8px;
    }

    /* more spread, low contrast */
    .custom-hover:hover {
        box-shadow: 0 4px 12px 0px rgba(0,0,0,.108);
    }
    
    .v-list__tile {
        height: auto;
        padding: 8px 16px;
    }
    
    .v-list__tile__title {
        font-size: 21px;
    }
    
    v-card-tile-content {
        padding: 12px;
        max-width: 80%;
    }
    
    .v-list__tile__action, .v-list__tile__avatar {
        min-width: 72px;
        min-height: 72px;
        background-position: center;
        background-size: cover;
        border-radius: 50px;
    }
    
</style>

<script>
export default {
  name: 'PersonCardSmall',
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
};
</script>
