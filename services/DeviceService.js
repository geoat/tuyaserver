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
    return DeviceService.#singleton;
  }

  constructor() {
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
    return DeviceService.#devices.delete(deviceUniqueKey);
  }

  connectDevice(deviceType, deviceId) {
    const deviceUniqueKey = Device.getUniqueKey(deviceType, deviceId);
    DeviceService.#devices.get(deviceUniqueKey).connect();
  }

  disconnectDevice(deviceType, deviceId) {
    const deviceUniqueKey = Device.getUniqueKey(deviceType, deviceId);
    DeviceService.#devices.get(deviceUniqueKey).disconnect();
  }

  onDevice(deviceType, deviceId) {
    const deviceUniqueKey = Device.getUniqueKey(deviceType, deviceId);
    DeviceService.#devices.get(deviceUniqueKey).on();
  }

  offDevice(deviceType, deviceId) {
    const deviceUniqueKey = Device.getUniqueKey(deviceType, deviceId);
    DeviceService.#devices.get(deviceUniqueKey).off();
  }
}

module.exports = DeviceService;