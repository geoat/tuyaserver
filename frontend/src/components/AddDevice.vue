<template>
  <v-dialog
    v-model="showDialog"
    max-width="600px"
    persistent
    no-click-animation
    @keydown.esc="close"
  >
  <v-card>
    <v-card-title>
      {{ isUpdate?'Update Device': 'Add Device' }}
    </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          ref="deviceName"
          label="Device Name *"
          v-model="device.deviceName"
          :rules="[ isNonEmptyString ]"/>
        <v-select
          :items="['tuya']"
          ref="deviceType"
          label="Device Type *"
          v-model="device.deviceType"
          :rules="[ isNonEmptyString ]"        />
        <v-text-field
          ref="deviceId"
          label="Device Id *"
          v-model="device.deviceId"
          :rules="[ isNonEmptyString ]"/>
        <v-text-field
          ref="deviceKey"
          label="Device Key *"
          v-model="device.deviceKey"
          :rules="[ isNonEmptyString ]"/>
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

  export default Vue.extend({
    name: 'AddDevice',
    props: {
    },
    data: () => ({
      showDialog: false,
      isUpdate: false,
      device: {
        deviceName: '',
        deviceType: 'tuya',
        deviceId: '',
        deviceKey: '',
      }
    }),
    methods: {
      close() {
        this.showDialog = false
        this.resolve(null)
      },
      open: function (device, isUpdate) {
        this.showDialog = true
        this.isUpdate = isUpdate
        this.$nextTick(() => {
          this.$refs.form.reset();
          if (device) {
            this.device = Object.assign({}, device)
          } else {
            this.device.deviceId = ''
            this.device.deviceType = 'tuya'
            this.device.deviceName = ''
            this.device.deviceKey = ''
          }
        });        

        return new Promise((resolve, reject) => {
          this.resolve = resolve
          this.reject = reject
        })
      },
      isNonEmptyString(string) {
        return string !==''
      },
      save() {
        if (this.$refs.form.validate()) {
          this.$emit('save', this.device)
          this.close()
        }
      }
    }
  })
</script>