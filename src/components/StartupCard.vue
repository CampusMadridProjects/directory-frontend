<template>
  <v-card light :hover="true" class="box-shadow light-border custom-hover">
    <div @click="$router.push({name: 'startupDetail', params: {id: id}})">
      <v-card-media
        :height="cardHeight"
        :src="logo"
      ></v-card-media>

      <v-card-title primary-title>
        <h3 class="headline mb-0">{{ name }}</h3>
        <div class="grey--text">{{ accelerator }}</div>
      </v-card-title>
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


export default {
  name: 'People',
  props: {
    id: { type: String, required: true },
    logo: { type: String, required: true },
    name: { type: String, required: true },
    people: { type: Array, required: true },
    bio: { type: String, required: true },
    accelerator: { type: String, required: true },
  },
  data: () => ({
    cardHeight: '164px',
  }),
};
</script>
