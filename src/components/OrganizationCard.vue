<template>
  <v-card light :hover="true">
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

  .startup-logo {
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    display: inline-block;
    height: 92px;
    width: 92px;
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
