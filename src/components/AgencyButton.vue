<template>
  <div>
    <v-dialog
      v-model="dialog"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          v-on="on"
          class="elevation-0 mx-0 br-6"
          @click="$ga.event('agency_connect', 'open_form', id)"
        >
          Hire me!
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
          Connect
        </v-card-title>

        <v-card-text>
          <p class="pb-2 text-xs-center">
            Let us know your name and your email, and we'll make the connection happen!
          </p>

          <agency-form
            :form="form"
            :disabled="!canSend"
            @submit="send"
          />
        </v-card-text>

        <loading
          v-if="$store.state.mail.loading"
          class="mb-3"
        />
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      color="success"
      :timeout="2000"
    >
      Email sent!
    </v-snackbar>
  </div>
</template>

<style scoped>

  .close-button {
    width: 45px;
  }

</style>

<script>
  import AgencyForm from '@/components/AgencyForm.vue';
  import Loading from '@/components/Loading.vue';

  export default {
    components: {
      AgencyForm,
      Loading,
    },

    props: {
      id: {
        type: String,
        default: '',
      },
    },

    data: () => ({
      dialog: false,
      name: '',
      email: '',
      message: '',
      showErrors: false,
      snackbar: false,
    }),

    computed: {
      config() {
        return this.$store.state.config.config || {};
      },
      form() {
        if (!this.config.agency || !this.config.agency.form) return [];

        try {
          return JSON.parse(this.config.agency.form);
        } catch (e) {
          console.error('[agency] Error loading agency form');
          return [];
        }
      },
      // emailError() {
      //   if (!this.showErrors) return null;

      //   let { email } = this;
      //   if (!email) {
      //     return "Email is mandatory";
      //   } else if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
      //     return "Invalid email format";
      //   }

      //   return null;
      // },
      // nameError() {
      //   if (!this.showErrors) return null;
      //   if (!this.name) {
      //     return "Name is mandatory";
      //   }
      //   return null
      // },
      // messageError() {
      //   if (!this.showErrors) return null;
      //   if (!this.message) {
      //     return "Message is mandatory";
      //   }
      //   return null
      // },
      canSend() {
        if (this.$store.state.agency.loading === true) {
          return false;
        }

        // return (this.id && this.name && this.email && this.message);
        return true;
      },
    },

    methods: {
      send(formResponse) {
        const { id } = this;

        this.$ga.event('agency_connect', 'connect', id)
        this.$store.dispatch('agency/send', {
            ...formResponse,
            id,
          })
          .finally(() => {
            this.snackbar = true;
            this.dialog = false;
          });
      }
    }
  }
</script>
