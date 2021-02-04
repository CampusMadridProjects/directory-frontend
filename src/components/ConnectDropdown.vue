<template>
  <div>
    <v-btn
      color="primary"
      x-large
      class="elevation-0 br-6 mx-0"
      @click="showConnectOptions = true;"
    >
      Connect
    </v-btn>

    <div
      v-if="showConnectOptions"
      class="connect-options"
    >
      <div
        class="connect-options-overlay"
        @click="showConnectOptions = false"
      ></div>
      <v-list class="connect-options-list">
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
          @click="$ga.event('person_detail', 'connect', data.id)"
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
    </div>

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

.connect-options {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  max-width: 360px;
  height: 100%;
  z-index: 2;
}
  .connect-options-overlay {
    position: fixed;
    height: 100%;
    max-width: 360px;
    width: 100%;
    background-color: rgba(0,0,0,.3);
  }
  .connect-options-list {
    background-color: #ffffff;
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 3;
    max-width: 360px;
    width: 100%;
  }

@media screen and (max-width: 768px) {
  .connect-options,
  .connect-options-overlay,
  .connect-options-list {
    max-width: 768px;
  }
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
    showConnectOptions: false,
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
      this.$ga.event('email_connect', 'open_form', this.data.id);
      this.emailDialog = true;
      this.showConnectOptions = false;
    },
  },
};
</script>