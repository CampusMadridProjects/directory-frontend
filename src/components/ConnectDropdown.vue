<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn
        color="primary"
        x-large
        class="elevation-0 br-6 mx-0"
        v-on="on"
      >
        Connect
      </v-btn>
    </template>
    <v-list>
      <v-list-tile
        avatar
        @click=""
      >
        <v-list-tile-action>
          <v-icon class="pl-1">email</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
            Connect via Email
        </v-list-tile-content>
      </v-list-tile>
      
        <!-- v-if="data.slack" -->
      <v-list-tile
        avatar
        :href="$slackUrl(data.slack)"
      >
        <v-list-tile-action>
          <v-img
            src="img/slack_64.png"
            max-width="32"
          />
        </v-list-tile-action>
        <v-list-tile-content>
            Connect via Slack
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<style scoped>
>>> .v-list__tile__action, .v-list__tile__avatar {
  min-width: 56px;
}

* {
  overflow-y: hidden;
}
</style>

<script>
export default {
  name: 'ConnectDropdown',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>