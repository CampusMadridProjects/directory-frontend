<template>
  <v-card light :hover="true" class="box-shadow light-border custom-hover">
    <div @click="goToStartup(id)">
      <v-img
        :height="cardHeight"
        :src="logo"
        contain
        class="card-user-pic"
      ></v-img>

      <v-card-title primary-title>
        <h3 class="headline mb-0">{{ name }}</h3>
        <div class="grey--text">This is a dummy text</div>
      </v-card-title>
    </div>
  </v-card>
</template>

<style scoped>
  
  .card-user-pic {
    margin-bottom: 0px;
  }
  
  .v-card__title--primary {
    padding: 8px 16px 24px;
  }

  >>> .v-card__media__background {
    background-size: contain !important;
  }

  .v-card__media__content {
    padding: 16px 8px 8px 8px;
    text-align: center;
    flex-direction: column;
  }

  .v-card__title {
    flex-direction: column;
  }

  .headline {
    text-align: center;
  }

  .startup-logo {
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    display: inline-block;
    height: 92px;
    width: 92px;
  }

  /* TD - duplicated in PersonCard */
  .light-border {
    border: 1px solid #eaeaea;
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
    accelerator: { type: String, required: false },
  },

  data: () => ({
    cardHeight: '164px',
  }),

  methods: {
    goToStartup: function goToStartup(id) {
      this.$ga.event('directory_list', 'view_startup', id);
      this.$router.push({ name: 'startupDetail', params: { id } });
    },
  },
};
</script>
