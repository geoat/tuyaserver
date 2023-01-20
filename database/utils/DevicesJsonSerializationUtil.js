const {Device} = require('../../devices/Device');
const SerializerUtil = require('./SerializerUtil');

class DeviceJsonSerializerUtil extends SerializerUtil{

  constructor() {
    super();
  }

  serialize(devices) {
    let jsonableObjectArray = [];
    for(let device of devices) {
      jsonableObjectArray.push(device.toJsonableObject())
    }
    return JSON.stringify(jsonableObjectArray);
  }

  deserialize(json) {
    let deviceArray = JSON.parse(json);

    for (let i = 0; i < deviceArray.length; i++) {
      deviceArray[i] = Device.fromJson(JSON.stringify(deviceArray[i]));
    }
    return deviceArray;
  }
}

module.exports = DeviceJsonSerializerUtil;