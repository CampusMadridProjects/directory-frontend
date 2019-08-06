<template>
  <v-list two-line>
    <template v-for="(item) in people">
      <v-list-tile
        :key="item.id"
        avatar
        @click="goToPerson(item.id)"
      >
        <v-list-tile-avatar>
          <img :src="item.pic || '/img/nopic.png'">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-html="item.name"></v-list-tile-title>
          <v-list-tile-sub-title v-html="item.role"></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>


<style scoped>
.v-list__tile__avatar {
  min-height: 0;
  min-width: 0;
  padding: 16px;
}
</style>


<script>
export default {
  name: 'PersonList',
  props: {
    people: { type: Array, required: true },
    eventCategory: { type: String, required: false },
  },
  methods: {
    goToPerson(id) {
      this.$ga.event((this.eventCategory || 'person_list'), 'view_person', id);
      this.$router.push({ name: 'personDetail', params: { id } });
    },
  },
};
</script>
