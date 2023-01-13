const {Device} = require('../../devices/Device');

class DeviceJsonSerializerUtil {

  static serializeDevices(devices) {
    return JSON.stringify(devices, (key, device) => {
      if (device._isDevice) {
          return device.toJSON();
      }
      return JSON.stringify(device);
    });
  }

  static deserializeDevices(json) {
    let deviceArray = JSON.parse(json.slice(1,-1));

    for (let i = 0; i < deviceArray.length; i++) {
      deviceArray[i] = Device.fromJson(JSON.stringify(deviceArray[i]));
    }
    return deviceArray;
  }
}

module.exports = DeviceJsonSerializerUtil;