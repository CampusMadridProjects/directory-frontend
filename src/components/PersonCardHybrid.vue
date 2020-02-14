<template>
  <v-flex>
    <person-card-small class="card-grid-item-card hidden-md-and-up"
      :id="person.id"
      :name="person.name"
      :surname="person.surnname"
      :pic="person.pic || ''"
      :role="getJob(person).role"
      :company="getJob(person).name"
      :expertise="typeTags(person.Tag, 'HAS_SKILL')"
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
      :role="getJob(person).role"
      :company="getJob(person).name"
      :expertise="typeTags(person.Tag, 'HAS_SKILL')"
      :bio="person.bio"
      :location="person.location"
      :twitter="person.twitter"
      :linkedin="person.linkedin">
    </person-card>
  </v-flex>
</template>

<style type="text/css">
  .card-grid-item-card {
    margin: 6px;
    padding-bottom: 8px;
    border: 1px solid #eaeaea;
      /*max-width: 200px;*/
  }

  /* adds additional space for 1 more card in wide screens */
  @media screen and (min-width: 1264px){
/*    .container {
        max-width: 1300px;
    }*/
    /*.flex.lg2 {
        flex-basis: 20%;
        max-width: 20%;
    }*/

    >>> .card-user-pic {
        height: calc(20vw - 80px);
    }
  }

  @media screen and (max-width: 959px) {
    .card-grid-item-card {
      margin: 0px;
      border: 0px;
      padding-bottom: 0px;
      max-width: auto;
    }
  }
</style>

<script>
import PersonCard from '@/components/PersonCard.vue';
import PersonCardSmall from '@/components/PersonCardSmall.vue';

export default {
  components: {
    PersonCard, 
    PersonCardSmall, 
  },
  
  props: {
    person: {
      type: Object,
      default: () => { return {} },
    }
  },

  methods: {
    getJob(person) {
      let job = {};
      if (person.Group && person.Group.length > 0) {
        [job] = person.Group;
      }

      return job;
    },

    typeTags(list, type) {
      if (!list) return [];

      return list.filter(tag => {
        const tagTypes = tag.relations ? tag.relations.map(type => type.toUpperCase()) : [];

        if (tagTypes.indexOf(type) > -1) {
          return true;
        }

        return false;
      });
    },
  },
}
</script>
