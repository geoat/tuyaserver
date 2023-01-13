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
        <v-container>
          <v-row class="grey lighten-4 my-1" v-for="(device, i) in devices" :key="i" cols="12">
            <v-col cols="12" xs="12" sm="12" md="6" grow class="text-left">
              <v-row style="color: black">
                <v-col cols="3" xs="3" sm="2" shrink class="text-center">
                  <v-avatar size="40px" class="grey ligthen-2">
                    <v-icon v-if=device.isConnected>
                      mdi-access-point
                    </v-icon>
                    <v-icon v-else>
                      mdi-access-point-remove
                    </v-icon>
                  </v-avatar>
                </v-col>
                <v-col xs="9" sm="10" grow>
                  <div class="text-h6">{{device.deviceName}}<br></div>
                  <div class="text-caption" v-text="device.deviceId"></div>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="6" class="text-right">
              <v-row>
                  <v-spacer></v-spacer>
                  <v-col cols="auto">
                    <v-btn icon @click="connectDevice(device)">
                      <v-icon>mdi-link</v-icon>
                    </v-btn>
                    <v-btn icon @click="disconnectDevice(device)">
                      <v-icon>mdi-link-off</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="auto" xs="12">
                    <SwitchWithStatus :device="device" @updateDeviceState="updateDeviceState"></SwitchWithStatus>
                  </v-col>
                  <v-col cols="auto" xs="12">
                    <v-btn icon @click="deleteDevice(device)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
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
