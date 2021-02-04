<template>
  <div class="d-flex">
    <div class="text-xs-center cursor-pointer">
      <v-menu offset-y :close-on-content-click="false">
        <template v-slot:activator="{ on }">
          <v-chip
            v-on="on"
          >
            <span class="pl-2 cursor-pointer">
              {{ programName }}
            </span>
            <v-icon right class="ml-0 mr-1 cursor-pointer">arrow_drop_down</v-icon>
          </v-chip>
        </template>
        <v-list>
          <v-list-tile
            v-for="(item, index) in programs"
            :key="index"
            @click="switchProgram(item.name)"
          >
            <v-checkbox
              primary
              v-model="item.active"
              @click="switchProgram(item.name)"
            ></v-checkbox>
            <v-list-tile-title>
              {{ item.name }}
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </div>
    <v-chip
      v-for="program in selected"
      :key="program"
      class="active"
      @click="switchProgram(program)"
    >
      <span class="px-2 cursor-pointer">
        {{ program }}
      </span>
    </v-chip>
  </div>
</template>

<style scoped>
  .cursor-pointer {
    cursor: pointer;
  }

  .v-chip {
    background: #FFFFFF;
    border: 1px solid #DFE1E5;
    color: #3c3c3c;
    cursor: pointer;
    /* font-weight: 500; */
    font-size: 1.1rem;
  }
    .v-chip:focus {
      box-shadow: none;
    }

    .v-chip.active {
      background-color: rgba(66, 133, 244, 0.16);
      border-color: transparent;
      color: #4285F4;
    }

  >>> .v-chip.active:focus .v-chip__content {
      background: #e3e8fd;
  }

  >>> .v-chip:focus .v-chip__content {
      background: #fff;
  }

  .chip-content > span {
    white-space: nowrap;
  }
</style>

<script>
export default {
  name: 'ProgramFilter',
  props: {
    value: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      selected: [],
    };
  },
  computed: {
    config() {
      return this.$store.state.config.config;
    },
    programs() {
      const programs = this.config.programOptions;

      if (programs) {
        return programs.split(',').map((item) => {
          return {
            name: item,
            active: this.isSelected(item),
          };
        });
      }

      return [];
    },
    programName() {
      // Uncomment the following line to enable dynamic chip title
      // return this.config.programTitle || 'Program';
      return 'Program';
    }
  },
  methods: {
    switchProgram(program) {
      const index = this.selected.indexOf(program);

      if (index !== -1) {
        this.selected.splice(index, 1);
      } else {
        this.selected.push(program)
      }

      this.$emit('input', this.selected);
    },
    isSelected(program) {
      const index = this.selected.indexOf(program);
      return index !== -1;
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        console.log('Updating selected value from outside...')
        console.log(newValue);
        this.selected = newValue;
      }
    },
  },
};
</script>
