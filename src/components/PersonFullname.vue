<template>
  <span>{{fullname}}</span>
</template>

<script>
export default {
  name: 'PersonFullname',
  props: {
    name: {
      type: String,
      default: '',
    },
    surname: {
      type: String,
      default: '',
    },
  },
  computed: {
    surnameFirst() {
      if (this.$store.state.config.config) {
        return this.$store.state.config.config.surnameFirst || false;
      }

      return false;
    },
    fullname() {
      if (this.surnameFirst) {
        return `${this.surname} ${this.name}`;
      }

      return `${this.name} ${this.surname}`;
    }
  },
};
</script>
