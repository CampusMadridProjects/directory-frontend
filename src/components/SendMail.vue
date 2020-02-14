<template>
  <v-dialog
    v-model="dialog"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        color="primary"
        dark
        v-on="on"
      >
        Send Mail
      </v-btn>
    </template>

    <v-card>
        <v-btn 
          class="close-button"
          icon
          flat
          @click="dialog = false"
          width="45"
        >
          <v-icon>close</v-icon>
        </v-btn>
      <v-card-title
        class="headline text-xs-center d-block"
        primary-title
      >
        Connect through Email
      </v-card-title>

      <v-card-text>
        <p class="pb-2 text-xs-center">
          Let us know your name and your email, and we will make the connection through email
        </p>

        <v-text-field
          v-model="name"
          label="Your name"
          placeholder="Tony Stark"
          required
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="Your email"
          placeholder="tony@starkindustries.com"
          required
          type="email"
          :error-messages="emailError"
        ></v-text-field>
        <v-textarea
          v-model="bio"
          auto-grow
          label="Your message"
          rows="1"
          maxLength="256"
          placeholder="I work in my garage to build prototypes that makes the world a better place to be."
        ></v-textarea>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn
          color="primary"
          @click="dialog = false"
        >
          Connect through email
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.close-button {
  width: 45px;
}
</style>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
}
</script>
