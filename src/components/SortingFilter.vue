<template>
  <div class="d-flex">
    <div class="text-xs-center cursor-pointer">
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-chip
            v-on="on"
          >
            <span class="pl-2 cursor-pointer">
              Sort By
            </span>
            <v-icon right class="ml-0 mr-1 cursor-pointer">arrow_drop_down</v-icon>
          </v-chip>
        </template>
        <v-list>
          <v-list-tile
            v-for="(item, index) in options"
            :key="index"
            @click="sort = item.name"
            :class="{ 'primary--text': item.name === sort }"
          >
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
            <v-list-tile-action>
              <v-icon
                v-if="item.name == sort"
                size="16"
                color="primary"
              >
                check
              </v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<style scoped>
  .cursor-pointer {
    cursor: pointer;
  }

  >>> .v-list__tile__title {
    font-size: 14px;
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

  >>> .v-list__tile__action, >>> .v-list__tile__avatar {
    min-width: 0;
    min-height: 0;
  }

  .chip-content > span {
    white-space: nowrap;
  }
</style>

<script>
export default {
  name: 'SortFilter',
  props: {
    value: {
      type: String,
      default: 'new',
    }
  },
  data() {
    return {
      sort: 'new',
      selected: [],
    };
  },
  computed: {
    config() {
      return this.$store.state.config.config;
    },
    options() {
      return [
        {
          name: 'new',
          text: 'Newest',
        },
        {
          name: 'abc',
          text: 'Alphabetical',
        },
        {
          name: 'startup',
          text: `By ${this.config.startupsText || 'Teams'}`,
        },
      ];
    },
  },
  watch: {
    sort: {
      immediate: true,
      handler() {
        this.$emit('input', this.sort);
      },
    },
  },
};
</script>
