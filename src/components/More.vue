<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1 md8 offset-md2 lg6 offset-lg3>  
        <v-card
          flat
          class="pb-4"
          v-if="config.slack"
        >
          <v-card-text>
            <v-layout align-center mb-3>
              <!-- <v-avatar color="grey" class="mr-3"></v-avatar> -->
              <strong class="title">Tips</strong>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-account</v-icon>
              </v-btn>

            </v-layout>
            <v-flex
              xs12
              class="bordered-card"
            >
              <v-card>
                <v-layout row>
                  <v-flex xs10>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline">Find who you need, also in Slack</div>
                        <p>
                          Just type /dir-search in any channel or conversation to start the
                          directory bot
                        </p>
                      </div>
                    </v-card-title>
                  </v-flex>

                  <!-- <v-flex xs2
                     class="pt-2">
                      <v-img
                        src="https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2019/01/Slack-New.jpg"
                        height="56px"
                        contain
                      ></v-img>
                  </v-flex> -->
                </v-layout>
                <!-- <v-divider light></v-divider> -->
                <a :href="'https://' + slackTeam + '.slack.com'">
                  <v-btn>Open Slack</v-btn>
                </a>
              </v-card>
            </v-flex>
          </v-card-text>
        </v-card>
        <v-card flat class="pb-4">
            <v-card-text>
                <v-layout align-center mx-1 mb-3>
                    <strong class="title">Help</strong>
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

                    <v-list-tile>
                      <div v-html="item.answer"></div>
                    </v-list-tile>
                  </v-list-group>

                  <!-- Directory standard faq -->
                  <v-list-group
                    v-for="item in items"
                    :key="item.title"
                    :prepend-icon="item.action"
                    no-action
                  >
                    <template v-slot:activator>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </template>

                    <v-list-tile>
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

                    <v-list-tile>
                      <div>
                        There is an official Slack channel for this community. You have to be invited by your space manager. You can browse the directory by typing <code>/dir-search</code> in any Slack channel or conversation. Your search results will be visible <strong>only to you</strong>.
                        <p class="pt-3">
                          <a :href="'https://' + slackTeam + '.slack.com'">
                            <v-btn>Open Slack</v-btn>
                          </a>
                        </p>
                      </div>
                    </v-list-tile>
                  </v-list-group>
                </v-list>
            </v-card-text>
        </v-card>
        <v-card flat class="pb-4">
          <v-card-text>
              <v-layout align-center mx-1 mb-3>
                <strong class="title">About</strong>
                <v-spacer></v-spacer>
              </v-layout>

              <p>
                This directory is part of Google for Startups &amp;
                <a href="http://communitytools.co/" target="blank">Community Tools</a>, a project
                created to facilitate contacts across Google for Startups Campus communities.<br />
                If you want to share your thoughts, report a bug or just say hi, you can get in
                touch by clicking <a href="mailto:directory@campus.co" target="blank">here</a>.
                We'd love to hear whatever's on your mind!
              </p>

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped>
  .bordered-card {
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    padding-bottom: 8px;
    padding-left: 8px;
  }

  .title {
    font-size: 2.4rem !important;
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
export default {
  name: 'More',
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
        text: "Users data is securely stored in Google's infrastructure in Europe under the best standards. Every action in this site is 100% anonymous. We do not collect info about you and do not track you in any creepy way.",
      },
    ],
  }),
  computed: {
    config() {
      return this.$store.state.config.config;
    },
    faq() {
      return this.$store.state.faq.list || [];
    },
    slackTeam() {
      return this.$store.getters['settings/slackWorkspace'] || '';
    },
  },

  beforeCreate() {
    this.$store.dispatch('faq/get');
  }
};
</script>
