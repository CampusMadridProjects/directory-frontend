<template>
  <v-card :hover="true" class="box-shadow light-border custom-hover">
  <div @click="show = !show">
    
        <div>
          <img class="card-user-pic" :src="pic" />
        </div>
        <div class="headline">{{ name }}</div>
        <span class="grey--text one-line">
          {{ role }} @ 
          <!-- <router-link :to="{name: 'startup', params: {startupId: company_id}}"> -->
            {{ company }}
          <!-- </router-link> -->
        </span>
    </v-card-media>

    <v-card-title primary-title>
      <div class="card-user-info">
        <h4>
          <span v-for="(ability, index) in expertise" :key="ability">{{ (index !== 0) ? ', ' + ability : ability }}</span>
        </h4>
        <span class="grey--text">{{ location }}</span>
      </div> 
    </v-card-title>

    <v-slide-y-transition>
      <v-card-text v-show="show">
        {{ bio }}
        <div class="person-card-social-icons">
          <a v-if="twitter" :href="twitter" target="_blank" class="person-card-social-icon"><img src="img/twitter_64.png" alt="twitter" /></a>
          <a v-if="linkedin" :href="linkedin" target="_blank" class="person-card-social-icon"><img src="img/linkedin_64.png" alt="linkedin" /></a>
        </div>
      </v-card-text>
    </v-slide-y-transition>
  </div>
  </v-card>
</template>

<style type="text/css">
  .v-card__media__content {
    padding: 16px 8px 8px 8px;
    text-align: center;
    flex-direction: column;
  }

  img.card-user-pic {
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
    
</style>

<script>
export default {
  name: 'People',
  props: {
    pic: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    expertise: { type: Array, required: true },
    bio: { type: String, required: false },
    location: { type: String, required: false },
    twitter: { type: String, required: false },
    linkedin: { type: String, required: false }
  },
  data: () => ({
    show: false
  })
}
</script> 