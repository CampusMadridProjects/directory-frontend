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
          
          <PostCard class="mb-4"></PostCard>

          <!--
          <div class="text-xs-center mb-4">
            <v-btn color="info" outline large>See more</v-btn>
          </div>
          -->
          
          <!-- /News -->
          
          <!-- New members -->
          <h1>
          New members
          </h1>
          <p>Go and share some coffee</p>

          <v-flex md5 class="mb-2">
            <person-card-small class="card-grid-item-card hidden-md-and-up"
              :id="person.id"
              :name="person.name"
              :surname="person.surnname"
              :pic="person.pic || ''"
              role="Jefazo"
              company="Commit Sans"
              expertise=""
              :bio="person.bio"
              :location="person.location"
              :twitter="person.twitter"
              :linkedin="person.linkedin">
            </person-card-small>

            <person-card class="card-grid-item-card hidden-sm-and-down sm2"
              :id="person.id"
              :name="person.name"
              :surname="person.surname"
              :pic="person.pic || ''"
              role="Jefazo"
              company="Commit Sans"
              expertise=""
              :bio="person.bio"
              :location="person.location"
              :twitter="person.twitter"
              :linkedin="person.linkedin">
            </person-card>
          </v-flex>
          <v-flex md5 class="mb-2">
            <person-card-small class="card-grid-item-card hidden-md-and-up"
              :id="person.id"
              :name="person.name"
              :surname="person.surnname"
              :pic="person.pic || ''"
              role="Patrón"
              company="Commit Sans"
              expertise=""
              :bio="person.bio"
              :location="person.location"
              :twitter="person.twitter"
              :linkedin="person.linkedin">
            </person-card-small>

            <person-card class="card-grid-item-card hidden-sm-and-down"
              :id="person.id"
              :name="person.name"
              :surname="person.surname"
              :pic="person.pic || ''"
              role="Patrón"
              company="Commit Sans"
              expertise=""
              :bio="person.bio"
              :location="person.location"
              :twitter="person.twitter"
              :linkedin="person.linkedin">
            </person-card>
          </v-flex>

          <!-- <div class="text-xs-center mb-4">
            <v-btn color="info" outline large>See more</v-btn>
          </div> -->

          <!-- /New members -->
       
        </v-flex>

      </v-layout>
    </v-container>
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
  
</style>

<script>

import PostCard from '@/components/PostCard.vue';
import PersonCard from '@/components/PersonCard.vue';
import PersonCardSmall from '@/components/PersonCardSmall.vue';

export default {
  components: {
    PostCard, 
    PersonCard, 
    PersonCardSmall, 
  },
  computed: {
    person() {
      return this.$store.state.people.list[0] || {};
    },
  },
}

</script>
