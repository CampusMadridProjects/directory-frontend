<template>
  <div>
    <v-btn
      color="primary"
      class="elevation-0 mx-0 br-6"
      @click="$ga.event('email_connect', 'open_form', id); dialog = true"
    >
      Connect
    </v-btn>

    <mail-form
      :id="id"
      v-model="dialog"
    />
  </div>
</template>

<style scoped>

  .close-button {
    width: 45px;
  }

</style>

<script>
  import MailForm from '@/components/MailForm.vue';

  export default {
    components: {
      MailForm,
    },
    props: {
      id: {
        type: String,
        default: '',
      },
    },
    data: () => ({
      dialog: false,
    }),
  }
</script>
