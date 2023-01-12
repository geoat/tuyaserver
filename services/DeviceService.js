const {Device, TuyaDevice} = require('../devices/Device');

class DeviceService {
  static #singleton = new DeviceService();
  static #devices = new Map();

  static getService() {
    return DeviceService.#singleton;
  }

  constructor() {

  }

  hasDevice(deviceType, deviceId) {
    return DeviceService.#devices.has(Device.getUniqueKey(deviceType, deviceId));
  }

  addTuyaDevice(eviceName, deviceType, deviceId, deviceKey) {
    const device = new TuyaDevice(eviceName, deviceType, deviceId, deviceKey);
    DeviceService.#devices.set(device.getUniqueKey(), device);
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