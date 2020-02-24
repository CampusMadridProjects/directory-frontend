<template>
  <div>
    <v-container
      fluid
      grid-list-lg
    >
      <v-layout row wrap pb-5>

        <v-flex xs12 sm12 md8 offset-md2 lg6 offset-lg3>
          <!-- News -->
          <div>
            <div>
              <h1>
                {{ newsHeading }}
              </h1>
              <p>{{ newsSubheading }}</p>
            </div>

            <PostCard
              v-for="post in newsList"
              :key="post.id"
              :heading="post.heading"
              :text="post.text"
              :pic="post.pic"
              class="mb-4"
            />

            <div
              v-if="moreNews"
              class="text-xs-center mb-4"
              @click="newsShown += 2"
            >
              <v-btn color="info" outline large>
                See more
              </v-btn>
            </div>
          </div>
          <!-- /News -->

          <!-- New members -->
          <div>
            <div>
              <h1>
                New members
              </h1>
              <p>Go and share some coffee</p>
            </div>

            <div class="card-grid pb-3">
              <v-flex
                xs12 sm6 md6 lg4 xl4
                v-for="person in newMemebers"
                :key="person.id"
                class="card-grid-item"
              >
                <person-card-hybrid :person="person" class="pa-0" />
              </v-flex>
            </div>
          </div>
          <!-- /New members -->

          <!-- <div class="text-xs-center mb-4">
            <v-btn color="info" outline large>See more</v-btn>
          </div> -->
          <!-- /New members -->
        </v-flex>

      </v-layout>
    </v-container>
    <!-- <v-container class="card-grid mb-5 pb-3">

    </v-container> -->
  </div>
</template>

<style scoped>

  /* */
  .title {
    font-size: 2.4rem !important;
  }

  /**/
  .v-card__title--primary {
    padding: 8px 0px;
  }

  .card-grid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .card-grid-item {
    display: flex;
  }

</style>

<script>
  import PostCard from '@/components/PostCard.vue';
  import PersonCardHybrid from '@/components/PersonCardHybrid.vue';

  export default {
    components: {
      PostCard,
      PersonCardHybrid,
    },
    data: () => ({
      newsShown: 2,
      membersShown: 6
    }),
    computed: {
      config() {
        return this.$store.state.config.config || {};
      },
      newsHeading() {
        return this.config.newsHeading || 'It\'s happening';
      },
      newsSubheading() {
        return this.config.newsSubheading || 'News from the community';
      },
      newsList() {
        return this.$store.state.news.list.slice(0, this.newsShown);
      },
      moreNews() {
        return (this.newsShown < this.$store.state.news.list.length)
      },

      newMemebers() {
        return this.$store.state.people.list.slice(0, this.membersShown);
      },
    },
    beforeMount() {
      this.$store.dispatch('news/get');
    },
  }

</script>
