<template>
  <div class="text-xs-center">
    <v-progress-circular
      indeterminate
      :size="size"
    />
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    size: {
      type: [Number, String],
      default: '32',
  	},
  },
};
</script>