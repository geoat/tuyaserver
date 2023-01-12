import WebApi from '../common/WebApi'
export default {
  test: function () {
    return WebApi.get('files').then((response: any) => {
      return response
    }).catch(function () {
    })
  },
  getDevices: function() {
    return WebApi.get('device/getAll').then((response: any) => {
      return response
    }).catch(function () {
    })
  },
  changeOnState: function(device: any, state: boolean) {
    if (state) {
      return WebApi.post(`device/on?deviceType=${device.deviceType}&deviceId=${device.deviceId}`)
    } else {
      return WebApi.post(`device/off?deviceType=${device.deviceType}&deviceId=${device.deviceId}`)
    }
  },
  connect: function(device: any) {
    return WebApi.post(`device/connect?deviceType=${device.deviceType}&deviceId=${device.deviceId}`)
  },
  disconnect: function(device: any) {
    return WebApi.post(`device/disconnect?deviceType=${device.deviceType}&deviceId=${device.deviceId}`)
  },
  delete: function(device: any) {
    return WebApi.delete(`device/delete?deviceType=${device.deviceType}&deviceId=${device.deviceId}`)
  },
  addDevice: function(device: any) {
    return WebApi.post(`device/add?deviceName=${device.deviceName}&deviceType=${device.deviceType}&deviceId=${device.deviceId}&deviceKey=${device.deviceKey}`)
  }
}