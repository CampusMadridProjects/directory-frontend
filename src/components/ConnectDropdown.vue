<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          x-large
          class="elevation-0 br-6 mx-0"
          v-on="on"
        >
          Connect
        </v-btn>
      </template>
      <v-list>
        <v-list-tile
          v-if="config.emailConnect === true"
          avatar
          @click="emailConnect()"
        >
          <v-list-tile-action>
            <v-icon class="pl-1">email</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
              Connect via Email
          </v-list-tile-content>
        </v-list-tile>
        
        <v-list-tile
          v-for="item in activeLinks"
          avatar
          :href="item.link"
          target="_blank"
        >
          <v-list-tile-action>
            <v-img
              :src="item.pic"
              max-width="24"
              class="ml-1"
            />
          </v-list-tile-action>
          <v-list-tile-content>
              Connect via {{ item.text }}
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>

    <mail-form
      :id="data.id"
      v-model="emailDialog"
    />
  </div>
</template>

<style scoped>
>>> .v-list__tile__action, .v-list__tile__avatar {
  min-width: 56px;
}

* {
  overflow-y: hidden;
}
</style>

<script>
import MailForm from '@/components/MailForm.vue';

export default {
  name: 'ConnectDropdown',
  components: {
    MailForm,
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
  },
  data: () => ({
    emailDialog: false,
  }),
  computed: {
    slackActive() {
      if (this.config.slack && this.config.slack.active) {
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
          pic: '/img/facebook_64.png',
          text: 'Facebook',
          event: 'facebook',
          active: this.config.hasFacebook,
          link: this.$link(this.data.facebook),
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
  },
  methods: {
    emailConnect() {
      console.log(this.emailDialog);
      console.log('connect via emaiol');
      this.emailDialog = true;
    },
  },
};
</script>