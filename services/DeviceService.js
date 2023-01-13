const {Device, TuyaDevice} = require('../devices/Device');
const DatabaseFactory = require('../database/DatabaseFactory');

class DeviceService {
  static #singleton = new DeviceService();
  static #devices = new Map();
  static #database

  static getService() {
    DeviceService.#database = DatabaseFactory.getDatabase(`devices`);
    const deviceArray = this.#database.readDevices();
    for (let i = 0; i < deviceArray.length; i++) {
      const device = deviceArray[i];
      DeviceService.#devices.set(device.getUniqueKey(), device);
    };
    DeviceService.setRequestedState();
    setTimeout(()=> {
      DeviceService.setRequestedState()
    }, 300000);
    return DeviceService.#singleton;
  }

  constructor() {
  }

  static setRequestedState() {
    DeviceService.#devices.forEach(device => {
      device.resumeConnectedState();
    });
  }

  hasDevice(deviceType, deviceId) {
    return DeviceService.#devices.has(Device.getUniqueKey(deviceType, deviceId));
  }

  addTuyaDevice(deviceName, deviceType, deviceId, deviceKey) {
    const device = new TuyaDevice(deviceName, deviceType, deviceId, deviceKey);
    DeviceService.#devices.set(device.getUniqueKey(), device);
    DeviceService.#database.storeDevices(DeviceService.#devices);
  }

  getDevice(deviceType, deviceId) {
    const deviceUniqueKey = Device.getUniqueKey(deviceType, deviceId);
    return DeviceService.#devices.get(deviceUniqueKey);
  }

  getAllDevices() {
    return DeviceService.#devices.values();
  }

  deleteDevice(deviceType, deviceId) {
    const deviceUniqueKey = Device.getUniqueKey(deviceType, deviceId);
    const result = DeviceService.#devices.delete(deviceUniqueKey);
    DeviceService.#database.storeDevices(DeviceService.#devices);
    return result;
  }

  connectDevice(deviceType, deviceId) {
    const deviceUniqueKey = Device.getUniqueKey(deviceType, deviceId);
    DeviceService.#devices.get(deviceUniqueKey).connect();
    DeviceService.#database.storeDevices(DeviceService.#devices);
  }

  disconnectDevice(deviceType, deviceId) {
    const deviceUniqueKey = Device.getUniqueKey(deviceType, deviceId);
    DeviceService.#devices.get(deviceUniqueKey).disconnect();
    DeviceService.#database.storeDevices(DeviceService.#devices);
  }

  onDevice(deviceType, deviceId) {
    const deviceUniqueKey = Device.getUniqueKey(deviceType, deviceId);
    DeviceService.#devices.get(deviceUniqueKey).on();
    DeviceService.#database.storeDevices(DeviceService.#devices);
  }

  offDevice(deviceType, deviceId) {
    const deviceUniqueKey = Device.getUniqueKey(deviceType, deviceId);
    DeviceService.#devices.get(deviceUniqueKey).off();
    DeviceService.#database.storeDevices(DeviceService.#devices);
  }
}

module.exports = DeviceService;