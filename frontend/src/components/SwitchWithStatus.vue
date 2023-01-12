<template>
  <div>
    <v-chip class="mx-2" :color="statusColor" :outlined="isNotUpdated"></v-chip>
    <v-btn @click="updateDeviceState(true)" :disabled="!device.isConnected">
      ON
    </v-btn>
    <v-btn @click="updateDeviceState(false)" :disabled="!device.isConnected">
      OFF
    </v-btn>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default Vue.extend({
    name: 'SwitchWithStatus',
    props: {
      device: Object
    },
    data: () => ({
    }),
    methods: {
      updateDeviceState(value) {
      this.$emit('updateDeviceState', this.device, value)
      }
    },
    computed: {
      statusColor: function() {
        if ((this.device.state !== undefined) && this.device.state) {
          return "green";
        } else {
          return "grey";
        }
      },
      isNotUpdated: function() {
        return ((this.device.connectionState.value !== 'CONNECTED') ||  (this.device.state === undefined));
      }
    }
  })
</script>