<template>
<div>
  <v-toolbar extended>
    <v-toolbar-title>
      <h3>Schedules</h3>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="openAddRepeatingTasksDialog" color="primary">Add Repeating Task</v-btn>
    <v-btn @click="openAddExactTimeTasksDialog" color="primary">Add Exact Time Task</v-btn>
  </v-toolbar>
  <v-card class="mx-auto px-5" v-if="tasks?.length > 0">
    <v-card-text>
      <v-container>
        <v-row class="grey lighten-4 my-2" v-for="(task, i) in tasks" :key="i" cols="12" @click="toggleExpand(i)">
          <v-col cols="12" xs="12" sm="12" md="6" grow class="text-left">
            <v-row style="color: black">
              <v-col xs="9" sm="10" grow>
                <div v-if="task.days" class="text-h6">On Days: {{task.days.join(', ')}}<br></div>
                <div v-else-if="task.date" class="text-h6">On: {{task.date}}<br></div>
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
  <AddRepeatingTask ref="addRepeatingTaskDialog" :devices="devices" @save="addScheduledTask"></AddRepeatingTask>
  <AddExactTimeTask ref="addExactTimeTaskDialog" :devices="devices" @save="addScheduledTask"></AddExactTimeTask>
</div>
</template>

<script>
  import Vue from 'vue'
  import AddRepeatingTask from './AddRepeatingTask'
  import AddExactTimeTask from './AddExactTimeTask'
  import SchedulerService from '@/services/SchedulerService'
  import TaskDetails from './TaskDetails'

  export default Vue.extend({
    name: 'TasksListComponent',
    components: {
      AddRepeatingTask,
      AddExactTimeTask,
      TaskDetails
    },
    props: {
      tasks: [],
      devices: []
    },
    data: () => ({
    }),
    methods: {
      openAddRepeatingTasksDialog() {
        this.$refs.addRepeatingTaskDialog.open(null, false)
        .finally(() => this.$emit(`refreshTasks`));
      },
      openAddExactTimeTasksDialog() {
        this.$refs.addExactTimeTaskDialog.open(null, false)
        .finally(() => this.$emit(`refreshTasks`));
      },
      addScheduledTask(task) {
        SchedulerService.addScheduledTask(task);
      },
      deleteScheduledTask(task) {
        SchedulerService.deleteScheduledTask(task).then(()=> {
          this.$emit(`refreshTasks`);
        })
      },
      toggleExpand(i) {
        this.$refs[`taskDetails${i}`][0].toggleExpand();
      }
    }
  })
  </script>