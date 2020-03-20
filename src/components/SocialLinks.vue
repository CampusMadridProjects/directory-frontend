<template>
  <div v-if="hasConnections">
    <h2 v-if="!hideHeading">
      Social profiles
    </h2>

    <div class="person-card-social-icons">

      <social-links-item
        v-for="item in activeLinks"
        :link="item.link"
        :text="item.text"
        :pic="item.pic"
        :event="item.event"
        class="person-card-social-icon"
      />
<!--
      <a v-if="slackActive && data.slack"
        :href="slackUrl(data.slack)"
        target="_blank"
        class="person-card-social-icon"
        @click="$ga.event('person_detail', 'slack', data._id)"
      >
        <img src="img/slack_64.png" alt="slack" />
        <span>Slack</span>
      </a> -->
    </div>
  </div>
</template>

<style scoped>

  .person-card-social-icons {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

</style>

<script>
  import SocialLinksItem from '@/components/SocialLinksItem.vue';

  export default {
    name: 'SocialLinks',
    components: {
      SocialLinksItem,
    },
    props: {
      data: {
        type: Object,
        default: () => ({}),
      },
      config: {
        type: Object,
        default: () => ({}),
      },
      hideHeading: {
        type: Boolean,
        default: false,
      }
    },
    computed: {
      slackActive() {
        if (this.config.slack) {
          return true;
        }
        return false;
      },
      links() {
        return [
          {
            pic: '/img/slack_64.png',
            text: 'Slack',
            event: 'slack',
            active: this.slackActive,
            link: this.$slackUrl(this.data.slack),
          },
          {
            pic: '/img/linkedin_64.png',
            text: 'LinkedIn',
            event: 'linkedin',
            active: this.config.hasLinkedin,
            link: this.$link(this.data.linkedin),
          },
          {
            pic: '/img/twitter_64.png',
            text: 'Twitter',
            event: 'twitter',
            active: this.config.hasTwitter,
            link: this.$link(this.data.twitter),
          },
          {
            pic: '/img/instagram_64.png',
            text: 'Instagram',
            event: 'instagram',
            active: this.config.hasInstagram,
            link: this.$link(this.data.instagram),
          },
          {
            pic: '/img/upwork_64.png',
            text: 'UpWork',
            event: 'upwork',
            active: this.config.hasUpwork,
            link: this.$link(this.data.upwork),
          },
          {
            pic: '/img/freelancer_64.png',
            text: 'Freelancer.com',
            event: 'freelancer',
            active: this.config.hasFreelancer,
            link: this.$link(this.data.freelancer),
          },
        ];
      },
      activeLinks() {
        return this.links.filter(item => {
          return (item.active === true && item.link);
        });
      },
      hasConnections() {
        return this.activeLinks.length > 0;
      },
    },
  };
</script>
