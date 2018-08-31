<template>
  <v-list two-line>
    <template v-for="(item) in people">
      <v-list-tile
        :key="item._id"
        avatar>
        <v-list-tile-avatar>
          <img :src="item.pic">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-html="item.name"></v-list-tile-title>
          <v-list-tile-sub-title v-html="item.role"></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
export default {
  name: 'PersonList',
  props: {
    people: { type: Array, required: true },
  },
};
</script>
