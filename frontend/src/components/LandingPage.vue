<template>
  <v-container class="mx-auto px-5">
    <v-toolbar>
      <v-toolbar-title>
        <h3>Devices</h3>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="openAddDeviceDialog" color="primary">Add Devices</v-btn>
    </v-toolbar>
    <v-card class="mx-auto px-5" v-if="devices?.length > 0">
      <v-card-text>
        <v-list
          subheader
          two-line
          color="grey lighten-4"
          >
          <v-list-item-group v-model="selected">
            <v-list-item
              v-for="(device, i) in devices"
              :key="i"
              :value="device"
            >
              <v-list-item-avatar>
                <v-icon v-if=device.isConnected
                  class="grey lighten-1">
                  mdi-access-point
                </v-icon>
                <v-icon v-else
                  class="grey lighten-1">
                  mdi-access-point-remove
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="text-h6">{{device.deviceName}}</v-list-item-title>
                <v-list-item-subtitle v-text="device.deviceId"></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="connectDevice(device)">
                  <v-icon>mdi-link</v-icon>
                </v-btn>
              </v-list-item-action>
              <v-list-item-action>
                <v-btn icon @click="disconnectDevice(device)">
                  <v-icon>mdi-link-off</v-icon>
                </v-btn>
              </v-list-item-action>
              <v-list-item-action>
                <SwitchWithStatus :device="device" @updateDeviceState="updateDeviceState"></SwitchWithStatus>
              </v-list-item-action>
              <v-list-item-action>
                <v-btn icon @click="deleteDevice(device)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
    <AddDevice
      ref="addDeviceDialog"
      @save="addDevice" />
  </v-container>
</template>

<script>
  import Vue from 'vue'
  import SwitchWithStatus from './SwitchWithStatus'
  import AddDevice from './AddDevice'
  import DevicesService from '../services/DevicesService'

  export default Vue.extend({
    name: 'LandingPage',

    components: {
      SwitchWithStatus,
      AddDevice
    },

    data: () => ({
      devices: null,
      selected: null,
      interval: null
    }),
    methods: {
      isConnected(device) {
        let connectionState = device.connectionState.value
        return connectionState === 'CONNECTED'
      },
      updateDeviceState(device, value) {
        DevicesService.changeOnState(device, value).then( ()=> {
          this.refreshDevices();
        })
      },
      connectDevice(device) {
        DevicesService.connect(device).then( ()=> {
          this.refreshDevices();
        })
      },
      disconnectDevice(device) {
        DevicesService.disconnect(device).then( ()=> {
          this.refreshDevices();
        })
      },
      deleteDevice(device) {
        DevicesService.delete(device).then( ()=> {
          this.refreshDevices();
        })
      },
      refreshDevices() {
        DevicesService.getDevices().then(response => {
        this.devices = response.map((device) => {
          return {...device, isConnected: this.isConnected(device)}
        })
      })
      },
      openAddDeviceDialog() {
        this.$refs.addDeviceDialog.open(null, false)
        .finally(() => this.refreshDevices())
      },
      addDevice(device) {
        DevicesService.addDevice(device).then( ()=> {
          this.refreshDevices();
        })
      }
    },
    
    mounted: function () {
      this.refreshDevices();
    },
    created () {
      this.interval = setInterval(function () {
        this.refreshDevices()
       }.bind(this), 5000)
    },
    beforeDestroy () {
      clearInterval(this.interval)
      this.interval = null
    },  
  })
</script>
