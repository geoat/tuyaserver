<template>
  <v-container class="mx-auto px-5">
    <div class="text-right">Last update time: {{lastUpdateTime}}</div>
    <br>
    <DevicesListComponent :devices="devices" @refreshDevices="refreshDevices"></DevicesListComponent>
    <br>
    <TasksListComponent :tasks="tasks" :devices="devices" @refreshTasks="refreshTasks"></TasksListComponent>
  </v-container>
</template>

<script>
  import Vue from 'vue'
  import DevicesService from '../services/DevicesService'
  import SchedulerService from '@/services/SchedulerService'
  import DevicesListComponent from './DevicesListComponent'
  import TasksListComponent from './TasksListComponent'

  export default Vue.extend({
    name: 'LandingPage',

    components: {
      DevicesListComponent,
      TasksListComponent
    },

    data: () => ({
      devices: null,
      interval: null,
      lastUpdateTime: 'not updated',
      tasks: null
    }),
    methods: {
      isConnected(device) {
      let connectionState = device.connectionState
      return connectionState === 'CONNECTED'
      },
      refreshDevices() {
        this.lastUpdateTime = this.getCurrentTime();
        DevicesService.getDevices().then(response => {
          this.devices = response.map((device) => {
            return {...device, isConnected: this.isConnected(device)}
          })
        })
      },
      getCurrentTime() {
        let currentDate = new Date().toLocaleDateString(`en-GB`, {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        });
        let currentTime = new Date().toLocaleTimeString({
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        return `${currentDate} ${currentTime}`
      },
      refreshTasks() {
        this.lastUpdateTime = this.getCurrentTime();
        SchedulerService.getAllScheduledTasks().then(response => {
          this.tasks = response
        })
      }
    },
    
    mounted: function () {
      this.refreshDevices();
      this.refreshTasks();
    },
    created () {
      this.interval = setInterval(function () {
        this.refreshDevices();
        this.refreshTasks();
       }.bind(this), 5000)
    },
    beforeDestroy () {
      clearInterval(this.interval);
      this.interval = null
    },  
  })
</script>
