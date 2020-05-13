<template>
  <v-flex>
    <!-- <person-card-small class="card-grid-item-card hidden-md-and-up"
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
    </person-card-small> -->
    <person-card class="card-grid-item-card light-border"
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

<style scoped>
  .light-border {
    border: 1px solid #eaeaea;
    border-radius: 6px;
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
