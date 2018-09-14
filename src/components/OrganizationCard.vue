<template>
  <v-card light :hover="true" class="box-shadow light-border custom-hover">
    <div @click="show = !show">
    <v-card-media
      :height="cardHeight"
      :src="logo"
    ></v-card-media>

    <v-card-title primary-title>
      <h3 class="headline mb-0">{{ name }}</h3>
      <!-- <div class="grey--text">{{ accelerator }}</div> -->
    </v-card-title>

    <v-slide-y-transition>
      <v-card-text v-show="show">
        <v-subheader>What do they do?</v-subheader>
        {{ bio }}

        <v-subheader>Who's there?</v-subheader>
        <person-list :people="people"></person-list>
      </v-card-text>
    </v-slide-y-transition>
    </div>
  </v-card>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .v-card__media__content {
    padding: 16px 8px 8px 8px;
    text-align: center;
    flex-direction: column;
  }

  .v-card__title {
    flex-direction: column;
  }
    
    .v-card-text {
        text-align: left;
    }
    
    .v-subheader {
        padding: 0px;
    }

  .startup-logo {
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    display: inline-block;
    height: 92px;
    width: 92px;
  }
    
    .light-border {
        border: 1px solid #f3f3f3;
        border-radius: 8px;
    }

    /* more spread, low contrast */
    .custom-hover:hover {
        box-shadow: 0 4px 12px 0px rgba(0,0,0,.108);
    }
    
    .box-shadow {
        box-shadow: 0px 8px 24px 8px rgba(0,0,0,0.04);
    }

</style>

<script>
import PersonList from './PersonList.vue';

export default {
  props: {
    logo: { type: String, required: true },
    name: { type: String, required: true },
    people: { type: Array, required: true },
    bio: { type: String, required: true },
  },
  data: () => ({
    show: false,
    cardHeight: '164px',
  }),
  components: {
    PersonList,
  },
};
</script>
