<template>
  <v-card>
    <v-img
      v-if="pic"
      :src="pic"
    ></v-img>
    <v-card-title primary-title class="px-0">
      <div class="py-2">
        <h2 class="mb-0">{{ heading }}</h2>
        <div class="body-1" v-html="text"></div>
      </div>
    </v-card-title>
  </v-card>
</template>

<style scoped>
  .body-1 {
    font-size: 18px !important;
    line-height: 28px;
    color: rgb(41, 41, 41);
  }
</style>

<script>
export default {
  props: {
    heading: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    pic: {
      type: String,
      default: '',
    },
  }
}
</script>
