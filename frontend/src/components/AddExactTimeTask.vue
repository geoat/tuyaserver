<template>
  <v-dialog
    v-model="showDialog"
    max-width="700px"
    persistent
    no-click-animation
    @keydown.esc="close"
  >
  <v-card>
    <v-card-title>
      {{ isUpdate?'Update Task': 'Add Task' }}
    </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-container>
          <v-row cols="12">
            <v-col>
              <h3>Select Date</h3>
              <v-date-picker
                v-model="inputDate"
                show-current
                :min="minDate"
                return-value="yyyy-MM-dd"
                :rules="[ isNonEmptyString ]">
              </v-date-picker>
            </v-col>
            <v-col>
              <h3>Select Time</h3>
              <v-time-picker
                  v-model="task.time"
                  format="24hr"
              ></v-time-picker>
              </v-col>
          </v-row>
        </v-container>
        <v-select
          v-model="task.device"
          :items="devicesWithUniqueId"
          item-value="deviceUid"
          label="Select a device"
          :rules="[ isNonEmptySelection ]"
          return-object
          >
          <template v-slot:selection="{ item }">
            <div>
              {{ item.deviceName }} - {{ item.deviceType }} - {{ item.deviceId }}
            </div>
          </template>
          <template v-slot:item="{ item }">
            <div>
              <h4>{{ item.deviceName }}</h4>
              <p>{{ item.deviceType }} - {{ item.deviceId }}</p>
            </div>
          </template>
        </v-select>
        <v-select 
          v-model="task.state"
          :items="desiredDeviceStates"
          item-text="text"
          item-value="value"
          :rules="[ isNonEmptySelection ]"
          label="Select a desired state"
          ></v-select>
      </v-form>        
    </v-card-text>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click.native="save()"
        >
          {{ isUpdate ? 'Update' : 'Add' }}
        </v-btn>
        <v-btn
          color="secondary"
          @click.native="close()"
        >
          Close
        </v-btn>
      </v-card-actions>
  </v-card>
  </v-dialog>
</template>

<script>
  import Vue from 'vue'
  import moment from 'moment'

  export default Vue.extend({
    name: 'AddExactTimeTask',
    props: {
      devices: []
    },
    data: () => ({
      showDialog: false,
      isUpdate: false,
      inputDate: '',
      minDate: new Date().toISOString().substr(0, 10),
      task: {
        date: '',
        time: '00:00',
        device: null,
        state: null
      },
      daysErrorMessage: null,
      desiredDeviceStates: [{value: true, text: 'On'}, {value: false, text: 'Off'}]
    }),
    methods: {
      close() {
        this.showDialog = false
        this.resolve(null)
      },
      open: function (task, isUpdate) {
        this.showDialog = true
        this.isUpdate = isUpdate
        this.$nextTick(() => {
          this.$refs.form.reset();
          this.daysErrorMessage = null;
          if (task) {
            this.task = Object.assign({}, task)
          } else {
            this.task.time = '00:00';
            this.inputDate = this.minDate;
            this.device = null;
            this.state = null;
          }
        });        

        return new Promise((resolve, reject) => {
          this.resolve = resolve
          this.reject = reject
        })
      },
      isNonEmptyString(string) {
        return !!string
      },
      isNonEmptySelection(value) {
        return (value !== null) && (value !== undefined)
      },
      save() {
        if (this.$refs.form.validate()) {
          this.$emit('save', this.task)
          this.close()
        }
      }
    },
    computed: {
      devicesWithUniqueId(){
        if (!this.devices) {
          return [];
        }
        return this.devices.map((device) => {
          return {...device, deviceUid: device.deviceType + `_` + device.deviceId };
        });
      }
    },
    watch: {
      inputDate(newDate) {
        if (newDate) {
          this.task.date = moment(newDate).format('DD/MM/yyyy')
        }
      }
    }
  })
</script>