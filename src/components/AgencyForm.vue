<template>
  <div>
    <div v-for="(field, key) in form" :key="key">
      <span v-if="isInput(field)">
        <v-text-field
          :label="field.name"
          :placeholder="field.placeholder"
          :type="fieldType(field.type)"
        ></v-text-field>
      </span>
      <span v-else-if="isTextarea(field)">
        <v-textarea
          :label="field.name"
          :placeholder="field.placeholder"
        ></v-textarea>
      </span>
    </div>

    <div class="d-flex justify-center">
      <v-btn color="primary">
        Submit
      </v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AgencyForm',
    props: {
      form: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
      isInput(field) {
        const input = ['input', 'email'];
        if (input.indexOf(field.type.toLowerCase()) !== -1) {
          return true;
        }
        return false;
      },
      isTextarea(field) {
        const textarea = ['textarea'];
        if (textarea.indexOf(field.type.toLowerCase()) !== -1) {
          return true;
        }
        return false;
      },
      fieldType(type) {
        if (type === 'email') return 'email';
        return 'text';
      },
    },
  };
</script>
