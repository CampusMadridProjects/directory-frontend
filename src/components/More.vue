<template>
<v-container>
    <v-flex lg6>
        <v-card flat>
            <v-card-text>
                <v-layout align-center mb-3>
    <!--                <v-avatar color="grey" class="mr-3"></v-avatar>-->
                    <strong class="title">News</strong>
                    <v-spacer></v-spacer>
    <!--
                    <v-btn icon>
                      <v-icon>mdi-account</v-icon>
                    </v-btn>
    -->
                </v-layout>
            <v-flex xs12>
                <v-card color="purple" class="white--text">
                    <v-layout row>
                        <v-flex xs7>
                        <v-card-title primary-title>
                            <div>
                                <div class="headline">Find who you need, also in Slack</div>
                                <div>Ellie Goulding</div>
                            </div>
                        </v-card-title>
                        </v-flex>
                        <v-flex xs5>
                        <v-img
                        src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
                        height="125px"
                        contain
                        ></v-img>
                        </v-flex>
                    </v-layout>
                    <v-divider light></v-divider>
                    <v-card-actions class="pa-3">
                    Rate this album
                    <v-spacer></v-spacer>
                    <v-icon>star_border</v-icon>
                    <v-icon>star_border</v-icon>
                    <v-icon>star_border</v-icon>
                    <v-icon>star_border</v-icon>
                    <v-icon>star_border</v-icon>
                    </v-card-actions>
                </v-card>
          </v-flex>
            </v-card-text>
        </v-card>
        
        <v-card flat>
            <v-card-text>
                <v-layout align-center mb-3>
                    <strong class="title">Help</strong>
                    <v-spacer></v-spacer>
                </v-layout>
                <v-list>
                  <v-list-group
                    v-for="item in items"
                    :key="item.title"
                    v-model="item.active"
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
                      {{item.items}}
                    </v-list-tile>
                  </v-list-group>
                </v-list>
            </v-card-text>
        </v-card>
        
        <v-card flat>
            <v-card-text>
                <v-layout align-center mb-3>
                    <strong class="title">About</strong>
                    <v-spacer></v-spacer>
                </v-layout>

                <p>
                    This directory is part of <strong>Community Tools</strong>, a project created by two humans to help digital professionals grow and prosper.<br /><br />
                    If you want to share your thoughts, report a bug or just say hi, you can get in touch by <a href="mailto:hola@codingcarlos.com">clicking here</a>.<br /><br />
                    We'll love to hear whatever's on your mind!<br /><br />
                </p>

            </v-card-text>
        </v-card>
        
    </v-flex>
</v-container>
</template>


<style scoped>
    .title {
        font-size: 2.4rem !important;
    }
    p {
        font-size: 1.2rem !important;
    }
    .v-card__title {
        padding: 16px 0px;
        padding-left: 16px
    }
    .box-shadow {
        box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);
    }
</style>


<script>
export default {
  name: 'More',
};
</script>

<script>
  export default {
    data () {
      return {
        items: [
          {
            action: 'local_activity',
            title: 'Attractions',
            items: 'hola que ase'
          },
          {
            action: 'restaurant',
            title: 'Dining',
            items: [
              { title: 'Breakfast & brunch' },
              { title: 'New American' },
              { title: 'Sushi' }
            ]
          },
          {
            action: 'school',
            title: 'Education',
            items: [
              { title: 'List Item' }
            ]
          },
          {
            action: 'directions_run',
            title: 'Family',
            items: [
              { title: 'List Item' }
            ]
          },
          {
            action: 'healing',
            title: 'Health',
            items: [
              { title: 'List Item' }
            ]
          },
          {
            action: 'content_cut',
            title: 'Office',
            items: [
              { title: 'List Item' }
            ]
          },
          {
            action: 'local_offer',
            title: 'Promotions',
            items: [
              { title: 'List Item' }
            ]
          }
        ]
      }
    }
  }
</script>
