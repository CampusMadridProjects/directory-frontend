<template>
  <v-card>
    <v-img src="https://www.elreferente.es/source/bnext.jpg"
      aspect-ratio="1.9"
    ></v-img>

    <v-card-title primary-title class="px-0">
      <div class="py-2">
        <h2 class="mb-0">{{ heading }}</h2>
        <div v-html="text"></div>
      </div>
    </v-card-title>
  </v-card>
</template>

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