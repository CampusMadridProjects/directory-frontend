<template>
  <div>
    <v-container
      fluid
      grid-list-lg
    >
      <v-layout row wrap pb-5>

        <v-flex xs12 sm7 offset-sm2>
          <!-- News -->
          <h1>
          It's happening
          </h1>
          <p>News from the community</p>
          
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
          <!-- /News -->

          <!-- New members -->
          <h1>
          New members
          </h1>
          <p>Go and share some coffee</p>

          <div class="card-grid mb-5 pb-3">
            <v-flex
              xs12 sm6 md6 lg4 xl4
              v-for="person in newMemebers"
              class="card-grid-item"
            >
              <person-card-hybrid :person="person" />
            </v-flex>
          </div>

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
  
  /* */
  .v-card {
    /* border: 1px solid #eaeaea; */
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
