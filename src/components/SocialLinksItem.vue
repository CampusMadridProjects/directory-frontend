<template>
  <a
    v-if="link"
    :href="link"
    target="_blank"
    class="person-card-social-icon"
    @click="track"
  >
    <v-chip class="d-flex" color="grey lighten-4">
      <v-avatar class="pa-1">
        <img :src="pic" :alt="text" />
      </v-avatar>
      <span>{{ text }}</span>
    </v-chip>
  </a>
</template>

<style scoped>

  .person-card-social-icon {
    display: inline-flex;
    align-content: center;
    color: black;
    align-items: center;
  }

</style>

<script>
  export default {
    name: 'SocialLinksItem',
    props: {
      link: {
        type: String,
        default: '',
      },
      pic: {
        type: String,
        default: '',
      },
      text: {
        type: String,
        default: '',
      },
      event: {
        type: String,
        default: 'social',
      },
    },
    methods: {
      track() {
        this.$ga.event('person_detail', this.event)
        // this.$ga.event('person_detail', 'social_link', this.event)
      }
    }
  };
</script>
