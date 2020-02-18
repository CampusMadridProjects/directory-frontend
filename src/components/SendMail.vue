<template>
  <div>
  <v-dialog
    v-model="dialog"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        color="primary"
        dark
        v-on="on"
      >
        Connect via email
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
          :error-messages="nameError"
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
          v-model="message"
          auto-grow
          label="Your message"
          placeholder="Write what you want to tell"
          :error-messages="messageError"
        ></v-textarea>
      </v-card-text>
      
      <loading
        v-if="$store.state.mail.loading"
        class="mb-3"
      />

      <v-card-actions class="justify-center">
        <v-btn
          :disabled="!canSend"
          color="primary"
          @click="sendMail()"
        >
          Connect through email
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
    <v-snackbar
      v-model="snackbar"
      color="success"
      :timeout="2000"
    >
      Email sent!
  <!--     <v-btn
        color="success"
        flat
        dark
        @click="snackbar = false"
      >
        Close
      </v-btn>
 -->    </v-snackbar>
  </div>
</template>

<style scoped>
.close-button {
  width: 45px;
}
</style>

<script>
import Loading from '@/components/Loading.vue';

export default {
  components: {
    Loading,
  },

  props: {
    id: {
      type: String,
      default: '',
    },
  },
  
  data: () => ({
    dialog: true,
    name: '',
    email: '',
    message: '',
    showErrors: false,
    snackbar: false,
  }),

  computed: {
    emailError() {
      if (!this.showErrors) return null;

      let { email } = this;
      if (!email) {
        return "Email is mandatory";
      } else if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        return "Invalid email format";
      }

      return null;
    },
    nameError() {
      if (!this.showErrors) return null;
      if (!this.name) {
        return "Name is mandatory";
      }
      return null
    },
    messageError() {
      if (!this.showErrors) return null;
      if (!this.message) {
        return "Message is mandatory";
      }
      return null
    },
    canSend() {
      if (this.$store.state.mail.loading === true) return false;

      return (this.id && this.name && this.email && this.message);
    },
  },

  methods: {
    sendMail() {
      let { id, name, email, message } = this;
      if (!id || this.nameError || this.emailError || this.messageError) {
        this.showErrors = true;
        return false;
      }

      this.$store.dispatch('mail/send', {
          id,
          name,
          email,
          message,
        })
        .finally(() => {
          this.snackbar = true;
          this.dialog = false;
        });
    }
  }
}
</script>
