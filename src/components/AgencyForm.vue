<template>
  <div>
    <div v-for="(field, key) in form" :key="key">
      <span v-if="isInput(field)">
          <!-- :ref="'field_'+ key" -->
        <v-text-field
          v-model="formAnswers[key]"
          :label="field.name"
          :placeholder="field.placeholder"
          :type="fieldType(field.type)"
        ></v-text-field>
      </span>
      <span v-else-if="isTextarea(field)">
          <!-- :ref="'field_'+ key" -->
        <v-textarea
          v-model="formAnswers[key]"
          :label="field.name"
          :placeholder="field.placeholder"
        ></v-textarea>
      </span>
    </div>

    <div v-if="hasErrors" class="text-xs-center my-3 red--text">
      You have to fill all fields
    </div>

    <div class="d-flex justify-center">
      <v-btn
        color="primary"
        :disabled="disabled"
        @click="submit"
      >
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
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    data: () => ({
      formAnswers: [],
      hasErrors: false,
    }),
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
      submit() {
        let formResponse = {};
        this.hasErrors = false;

        this.form.forEach((field, i) => {
          if (!this.formAnswers[i]) {
            this.hasErrors = true;
          }

          formResponse[field.ref] = this.formAnswers[i];
        }); 

        if (!this.hasErrors) {
          this.$emit('submit', formResponse);
        }
        
      }
    },
  };
</script>
