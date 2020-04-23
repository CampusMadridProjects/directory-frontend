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
            <!-- Section title -->
            <div v-if="hasNewsHeading">
              <h1>
                {{ newsHeading }}
              </h1>
              <p>{{ newsSubheading }}</p>
            </div>
            <!-- /Section title -->

            <PostCard
              v-for="post in newsList"
              :key="post.id"
              :heading="post.heading"
              :text="post.text"
              :pic="post.pic"
              class="mb-4 post-card"
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
            <!-- Section title -->
            <div v-if="hasMembersHeading">
              <h1>
                {{ membersHeading }}
              </h1>
              <p>{{ membersSubheading }}</p>
            </div>
            <!-- /Section title -->
            <!-- Content -->
            <v-container class="card-grid pb-3 pa-0">
              <v-flex
                xs6 sm4 md6 lg4 xl4
                v-for="person in newMemebers"
                :key="person.id"
                class="card-grid-item"
              >
                <person-card-hybrid :person="person" class="card-grid-item-card pa-0 light-border" />
              </v-flex>
            </v-container>
            <!-- /Content -->
          </div>
          <!-- <div class="text-xs-center mb-4">
            <v-btn color="info" outline large>See more</v-btn>
          </div> -->
          <!-- /New members -->
        </v-flex>
      </v-layout>
    </v-flex>
    <!-- FAB -->
    <a href="/admin/#/suggest-public/" class="no-underline">
      <v-btn
        class="hidden-md-and-up"
        fab
        fixed
        bottom
        right
        color="primary"
      >
        <v-icon>person_add</v-icon>
      </v-btn>
    </a>
    <!-- /FAB -->
    </v-container>
    <!-- <v-container class="card-grid mb-5 pb-3">
    </v-container> -->
  </div>
</template>

<style scoped>

  /* aligns FAB | duplicated in Startup.vue */
  .v-btn--bottom {
    bottom: 72px;
  }

  /* softens post's default border radius */
  .v-card {
    border-radius: 0px;
  }

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

  @media (max-width: 700px) {
    /* >>> .container.grid-list-lg .layout .flex.card-grid-item {
      padding: 8px 0;
    } */
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
      hasNewsHeading() {
        return !this.config.hideNewsHeading;
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
      hasMembersHeading() {
        return !this.config.hideNewMembersHeading;
      },

      membersHeading() {
        return this.config.newMembersHeading || 'New members';
      },
      membersSubheading() {
        return this.config.newMembersSubheading || 'Time to connect! Come say hello:';
      },
    },
    beforeMount() {
      this.$store.dispatch('news/get');
    },
    watch: {
      newsList: {
        immediate: true,
        handler(val) {
          if (val && val.length > 0) {
            this.$nextTick(setLinkTracking);
          }
        },
      },
    },
  };

  function setLinkTracking() {
    let links = document.querySelectorAll('.post-card a');
    for (var i = 0; i < links.length; i++) {
      // Set target as blank
      links[i].setAttribute('target', '_blank');
      // Clear events, if any
      links[i].removeEventListener('click', trackEvent)
      // And add a new event listener
      links[i].addEventListener('click', trackEvent)
    }
  }

  function trackEvent(e) {
    let { href } = e.target;
    let text = e.target.innerHTML;
    let title = getPostTitle(e.target);
    let label = `title:${title}|text:${text}|url:${href}`;

    ga('send', 'event', 'news', 'news_link', label);
  }

  function getPostTitle(element) {
    if (element.className.indexOf('post-card') === -1) {
      return getPostTitle(element.parentNode);
    } else {
      let h2 = element.querySelector('h2');
      return h2 ? h2.innerHTML : '';
    }
  }

</script>
