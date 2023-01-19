<template>
  <v-card flat v-if="expanded" class="ma-4">
    <v-card flat v-for="(deviceTask,j) in tasks" :key="j">
      <v-card-text>
        <v-container>
          <v-row style="color: black">
            <v-col>
              <v-row class="text-h6">{{findDeviceName(deviceTask)}}</v-row>
              <v-row class="text-h">{{ deviceTask.deviceType }} - {{ deviceTask.deviceId }}</v-row>
            </v-col>
            <v-divider vertical />
            <v-col><h1>{{deviceTask.state?`On`: `Off`}}</h1></v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
  import Vue from 'vue'

  export default Vue.extend({
    name: 'TaskDetails',
    props: {
      tasks: [],
      devices: []
    },
    data: () => ({
      expanded: true,
    }),
    methods: {
      toggleExpand() {
        this.expanded = !this.expanded;
      },
      findDeviceName(task){
        const device = this.devices.find((device)=> {
          if((device.deviceType === task.deviceType) && (device.deviceId === task.deviceId)) {
            return true;
          }
        })

        if (device != undefined) {
          return device.deviceName;
        } else {
          return ''
        }
      }
    }
  })
  </script>