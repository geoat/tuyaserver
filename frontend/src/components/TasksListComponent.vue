<template>
<div>
  <v-toolbar>
    <v-toolbar-title>
      <h3>Schedules</h3>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="openAddScheduledTasksDialog" color="primary">Add Task</v-btn>
  </v-toolbar>
  <v-card class="mx-auto px-5" v-if="tasks?.length > 0">
    <v-card-text>
      <v-container>
        <v-row class="grey lighten-4 my-2" v-for="(task, i) in tasks" :key="i" cols="12" @click="toggleExpand(i)">
          <v-col cols="12" xs="12" sm="12" md="6" grow class="text-left">
            <v-row style="color: black">
              <v-col xs="9" sm="10" grow>
                <div class="text-h6">On Days: {{task.days.join(', ')}}<br></div>
                <div>Time: {{task.time}}<br></div>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="6" class="text-right">
            <v-row>
                <v-spacer></v-spacer>
                <v-col cols="auto" xs="12">
                  <v-btn icon @click="deleteScheduledTask(task)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" class="ma-0 pa-0">
            <TaskDetails :ref="`taskDetails${i}`" :tasks="task.tasks" :devices="devices"></TaskDetails>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
  <AddTask ref="addTaskDialog" :devices="devices" @save="addScheduledTask"></AddTask>
</div>
</template>

<script>
  import Vue from 'vue'
  import AddTask from './AddTask'
  import SchedulerService from '@/services/SchedulerService'
  import TaskDetails from './TaskDetails'

  export default Vue.extend({
    name: 'TasksListComponent',
    components: {
      AddTask,
      TaskDetails
    },
    props: {
      tasks: [], 
      devices: []
    },
    data: () => ({
    }),
    methods: {
      openAddScheduledTasksDialog() {
        this.$refs.addTaskDialog.open(null, false)
        .finally(() => this.$emit(`refreshTasks`));
      },
      addScheduledTask(task) {
        SchedulerService.addScheduledTask(task);
      },
      deleteScheduledTask(task) {
        SchedulerService.deleteScheduledTask(task.days, task.time).then(()=> {
          this.$emit(`refreshTasks`);
        })
      },
      toggleExpand(i) {
        this.$refs[`taskDetails${i}`][0].toggleExpand();
      }
    }
  })
  </script>