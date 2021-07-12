<template>
  <v-container fluid grid-list-lg pa-0>
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1 md8 offset-md2 lg6 offset-lg3>
        <!-- Tips -->
        <v-card
          flat
          v-if="config.slack"
        >
          <v-card-text>
            <v-layout align-center mt-3 ml-3 mb-0 class="ml-xs-4">
              <!-- <v-avatar color="grey" class="mr-3"></v-avatar> -->
              <h1 class="display-5 mb-1">Tips</h1>
              <v-spacer></v-spacer>
              <!-- <v-btn icon>
                <v-icon>mdi-account</v-icon>
              </v-btn> -->
            </v-layout>
            <!-- Use Slack -->
            <v-flex
              xs12
              class="bordered-card"
              mx-xs-4 mt-2 mb-2
            >
              <v-card class="py-1">
                <v-layout row>
                  <v-flex xs10>
                    <v-card-title primary-title class="pt-2">
                      <div>
                        <h3 class="title mb-1">Find who you need, also in Slack</h3>
                        <p class="mb-0">
                          Just type <code class="elevation-0">/dir-search</code> in any channel or conversation to start the
                          directory bot.
                        </p>
                      </div>
                    </v-card-title>
                  </v-flex>
                  <!-- <v-flex xs2
                     class="pt-3 pr-3">
                      <v-img
                        src="https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2019/01/Slack-New.jpg"
                        height="56px"
                        contain
                      ></v-img>
                  </v-flex> -->
                </v-layout>
                <!-- <v-divider light></v-divider> -->
                <v-btn
                  depressed
                  :href="'https://' + slackTeam + '.slack.com'"
                  target="_blank"
                >
                  <v-icon right light class="mr-2 ml-0">open_in_new</v-icon>
                  Open Slack
                </v-btn>
              </v-card>
            </v-flex>
            <!-- /Use Slack -->
          </v-card-text>
        </v-card>
        <!-- /Tips -->
        <v-divider></v-divider>
        <!-- Help -->
        <v-card flat class="pb-0 mt-3">
          <v-card-text class="pb-0">
            <v-layout align-center mb-2 ml-3 class="ml-xs-4">
              <h1 class="display-5">Help</h1>
              <v-spacer></v-spacer>
            </v-layout>
            <v-list>
              <!-- Dynamic FAQ -->
              <v-list-group
                v-for="item in faq"
                :key="item.question"
                :prepend-icon="item.icon || 'help'"
                no-action
              >
                <template v-slot:activator>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.question }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>

                <v-list-tile class="group-list__content">
                  <div v-html="item.answer"></div>
                </v-list-tile>
              </v-list-group>

              <!-- Directory standard faq -->
              <v-list-group
                v-for="item in items"
                :key="item.title"
                :prepend-icon="item.action"
                no-action
                :value="activeItem"
              >
                <template v-slot:activator>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>

                <v-list-tile class="group-list__content extended-padding-left pr-2">
                  <div v-html="item.text"></div>
                </v-list-tile>
              </v-list-group>

              <!-- Slack -->
              <v-list-group
                v-if="config.slack"
                prepend-icon="forum"
                no-action
              >
                <template v-slot:activator>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>Slack</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>

                <v-list-tile class="extended-padding-left">
                  <div>
                    There is an official Slack channel for this community. You have to be invited by your space manager. You can browse the directory by typing <code>/dir-search</code> in any Slack channel or conversation. Your search results will be visible <strong>only to you</strong>.
                    <p class="pt-3">
                      <a :href="'https://' + slackTeam + '.slack.com'">
                        <v-btn depressed>Open Slack</v-btn>
                      </a>
                    </p>
                  </div>
                </v-list-tile>
              </v-list-group>
            </v-list>
          </v-card-text>
        </v-card>
        <!-- /Help -->
        
        <!-- Settings -->
        <v-card
          flat
          class="mt-2"
        >
          <v-card-text>
            <v-layout align-center ml-3 class="mb-0 ml-xs-4">
              <h1 class="display-5">Settings</h1>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </v-layout>
            <!-- -->
            <v-flex
              xs12
              class="pa-0"
            >
              <v-card>
                <v-list two-line class="pa-0">
                  <template>
                    <v-list-tile
                      ripple
                    >
                      <v-list-tile-content>
                        <v-list-tile-title>
                          <v-icon class="pr-3 pl-3">notifications</v-icon>
                          Push notifications
                        </v-list-tile-title>
                      </v-list-tile-content>

                      <v-list-tile-action>
                        <v-switch
                          v-model="pushEnabled"
                          inset
                        ></v-switch>
                      </v-list-tile-action>

                    </v-list-tile>
                    <!-- <v-divider></v-divider> -->
                  </template>
                </v-list>
                <v-divider></v-divider>
              </v-card>
            </v-flex>
            <!-- / -->
          </v-card-text>
        </v-card>
        <!-- /Settings -->

        <!-- About -->
        <v-card flat class="pb-5">
          <v-card-text>
              <v-layout align-center ml-3 mb-2 class="ml-xs-4">
                <h1 class="display-5">About</h1>
                <v-spacer></v-spacer>
              </v-layout>
              <p v-if="isGfs" class="mx-3 mx-xs-4">
                This directory is part of Google for Startups &amp;
                <a href="http://communitytools.co/" target="blank">Community Tools</a>, a project
                created to facilitate contacts across Google for Startups Campus communities.<br />
                If you want to share your thoughts, report a bug or just say hi, you can get in
                touch by clicking <a :href="supportHref" target="blank">here</a>.
                We'd love to hear whatever's on your mind!
              </p>
              <p v-else class="mx-3 mx-xs-4">
                This directory is part of
                <span v-if="companyName">{{ companyName }} &amp; </span>
                <a href="http://communitytools.co/" target="blank">Community Tools</a>, a project
                created to facilitate contacts across communities.<br />
                If you want to share your thoughts, report a bug or just say hi, you can get in
                touch by clicking <a :href="supportHref" target="blank">here</a>.
                We'd love to hear whatever's on your mind!
              </p>

          </v-card-text>
        </v-card>
        <!-- /About -->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped>

  .extended-padding-left {
    padding-left: 4rem;
  }

  .theme--light.v-list .v-list__group--active::before {
      background: none;
  }

  >>> .v-card-title .title {
    font-size: 24px !important;
  }

  /* aligns list element with icon (push notifications) */
  .v-list__tile__title {
    display: flex;
  }

  >>> .v-list__tile {
    padding: 0 !important;
  }

  .bordered-card {
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    padding-bottom: 8px;
    padding-left: 8px;
  }

  p {
    font-size: 1.2rem !important;
  }

  .v-card__title {
    padding: 16px 0px;
    padding-left: 16px;
    padding-bottom: 0px;
  }
  .v-card__text {
    padding: 16px 0px;
  }
  .v-btn:hover {
    background: #e0ebfe !important;
    color: #4285f4;
  }

  /* FIX THE ACCOURDION BUG INTRODUCED WITH ALUMNII DEPLOYMENT */
  >>> .v-list__group--active .v-list__group__items--no-action .v-list__tile {
    height: auto;
  }

  .group-list__content {
    margin-top: 12px;
  }

  @media only screen and (max-width: 960px) {

    .mx-xs-4 {
      margin-left: 16px !important;
      margin-right: 16px !important;
    }

    .ml-xs-4 {
      margin-left: 16px !important;
    }

}

</style>

<style>
  .v-list__group__header {
    max-height: 64px !important;
  }
  .v-list__group__items {
    padding-bottom: 24px;
  }
</style>

<script>
import firebase from '@/firebase';

function isPushEnabled() {
  let isEnabled = false;

  console.log(window.Notification.permission);
  if (window.Notification && window.Notification.permission === 'granted') {
    isEnabled = true;
  }

  if (window.localStorage && !!window.localStorage.getItem('pushDisabled')) {
    isEnabled = false;
  }

  return isEnabled;
}

export default {
  name: 'More',
  props: {
    activeItem: {
      type: Number,
      default: -1.
    },
  },
  data: () => ({
    items: [
      {
        action: 'person',
        title: 'Profiles',
        text: "Profiles are mantained by a space manager. You can manually add or update your profile or your startup info by filling <a href='/admin/#/suggest-public'>this form</a>. Your changes will be manually reviewd and updated as soon as possible."
      },
      {
        action: 'lock',
        title: 'Privacy',
        text: `
          <h4>What's beeing tracked?</h4>
          <p>Users data is securely stored in Google's infrastructure in Europe under the best standards. Every action in this site is 100% anonymous. To do so, we use third party cookies.</p>
          <br>
          <h4>What's a cookie?</h4>
          <p>A cookie is a file that is downloaded to your computer when you access certain web pages. Cookies allow a web page, among other things, to store and retrieve information about the browsing habits of a user or their equipment and, depending on the information they contain and the way they use their equipment, they can be used to recognize the user.</p><br>
          <h4>What types of cookies does this website use?</h4>
          <p>Google Analytics: Analytic cookies, are those that are well treated by us or by third parties, allow us to quantify the number of users and thus carry out the measurement and statistical analysis of the use made by users of the service offered.<br>For this, their browsing is analyzed in our website in order to improve the products or services that we offer you.</p>
          <p><a href="https://policies.google.com/technologies/cookies" target="
            ">More information about Google cookies</a>.</p>
          <br>

          <h4>Revocation and elimination of cookies</h4>
          <p>You can allow, block or delete the cookies installed on your computer by configuring the browser options installed on your computer.</p>`,
        // text: "Users data is securely stored in Google's infrastructure in Europe under the best standards. Every action in this site is 100% anonymous. We do not collect info about you and do not track you in any creepy way.",
      },
    ],
    pushEnabled: isPushEnabled(),
  }),
  computed: {
    isGfs() {
      const gfsDomain = 'gfs.directory';
      return (window.location.hostname.indexOf(gfsDomain) !== -1);
    },
    config() {
      return this.$store.state.config.config;
    },
    faq() {
      return this.$store.state.faq.list || [];
    },
    slackTeam() {
      return this.$store.getters['settings/slackWorkspace'] || '';
    },
    companyName() {
      return this.config.companyName;
    },
    supportHref() {
      return `mailto:${process.env.VUE_APP_SUPPORT_EMAIL}`;
    },
  },

  methods: {
    enablePushNotifications() {
      if (!firebase.messaging.isSupported()) {
        console.log('La mensajería no está sopotada en este dispositivo');
        this.isPushEnabled = false;
        return false;
      }

      this.$store.dispatch('push/subscribe')
        .then(() => {
          console.log('Done! Subscribed.');
        });
    },
    disablePushNotifications() {
      if (!firebase.messaging.isSupported()) {
        console.log('La mensajería no está sopotada en este dispositivo');
        this.isPushEnabled = false;
        return false;
      }

      this.$store.dispatch('push/unsubscribe')
        .then(() => {
          console.log('Unsubscribed.');
        });
    },
  },

  beforeCreate() {
    this.$store.dispatch('faq/get');
    this.pushEnabled = isPushEnabled();
  },

  watch: {
    pushEnabled(newVal, oldVal) {
      // console.log(e);
      // e.preventDefault();
      console.log(oldVal);
      if (oldVal) {
        this.disablePushNotifications();
      } else {
        this.enablePushNotifications();
      }
    },
  },
};
</script>
