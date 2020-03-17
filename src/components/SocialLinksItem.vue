<template>
  <a
    v-if="link"
    :href="link"
    target="_blank"
    class="person-card-social-icon"
    @click="track"
  >
    <img :src="pic" :alt="text" />
    <span>{{ text }}</span>
  </a>
</template>

<style scoped>
  .person-card-social-icon {
    display: inline-block;
    padding: 0 8px;
    display: flex;
    align-content: center;
    margin: 4px 0px;
    background: #fafafa;
    padding: 8px;
    color: black;
    align-items: center;
    border-radius: 4px;
  }

  .person-card-social-icon img {
    height: 32px;
    width: 32px;
    margin-right: 8px;
    border-radius: 50px;
  }

  /* fix | adds hover to social options */
  .person-card-social-icon:hover {
    background: #f0f0f0;
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