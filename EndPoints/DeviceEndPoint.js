const express = require('express');

const {DeviceConnectionState, DeviceState, Device, TuyaDevice} = require('../Devices/Device');

class DeviceEndPoint {
  static ROOT_PATH = '/api/device';
  static devices = new Map();

  constructor(app) {
    const router = express.Router();


    router.get(`/test`, this.test.bind(this));
    router.post(`/add`, this.addDevice.bind(this));
    router.get(`/get`, this.getDevice.bind(this));  
    router.get(`/getAll`, this.getAllDevices.bind(this));
    router.delete(`/delete`, this.deleteDevice.bind(this));
    router.post(`/connect`, this.connectDevice.bind(this));
    router.post(`/disconnect`, this.disconnectDevice.bind(this));
    router.post(`/on`, this.on.bind(this));
    router.post(`/off`, this.off.bind(this));

    app.use(DeviceEndPoint.ROOT_PATH, router);
  }

  test(req, res) {
	  console.log('get on test recived');
	  const string1 = req.query.string1;
    console.log(`String:  ${string1}`);
    res.send(`testing`);
  }

  addDevice(req, res) {
    const deviceName = req.query.deviceName;
    const deviceType = req.query.deviceType;
    const deviceId = req.query.deviceId;
    const deviceKey = req.query.deviceKey;
    console.log(`Request for adding ${deviceType} device with id: ${deviceId}`, );
    if (DeviceEndPoint.devices.has(Device.getUniqueKey(deviceType, deviceId))) {
      res.sendStatus(409)
      return;
    }
    switch (deviceType) {
      case 'tuya':
        const device = new TuyaDevice(deviceName, deviceType, deviceId, deviceKey);
        DeviceEndPoint.devices.set(device.getUniqueKey(), device); 
        console.log(`Device added`);       
      break;
      default:
        console.log(`Device type not known`);
    }
    res.send("added");
  }

  getDevice(req, res) {
    const deviceType = req.query.deviceType;
    const deviceId = req.query.deviceId;
    console.log(`Getting ${deviceType} device with id: ${deviceId}`);
    const deviceUniqueKey = Device.getUniqueKey(deviceType, deviceId);
    const deviceFound = DeviceEndPoint.devices.get(deviceUniqueKey);
    if (deviceFound !== undefined) {
      console.log(`Device found`);
      res.json(deviceFound);
    } else {
      res.sendStatus(404);
    }
  }

  getAllDevices(req, res) {
    res.json([...DeviceEndPoint.devices.values()]);
  }

  deleteDevice(req, res) {
    const deviceType = req.query.deviceType;
    const deviceId = req.query.deviceId;
    console.log(`Delete ${deviceType} device with id: ${deviceId}`);
    const deviceUniqueKey = Device.getUniqueKey(deviceType, deviceId);
    if (DeviceEndPoint.devices.delete(deviceUniqueKey)) {
      console.log(`Device found and deleted`);
      res.sendStatus(200);
    } else {
      console.log(`Device not found`);
      res.sendStatus(404);
    }
  }

  connectDevice(req, res) {
    const deviceType = req.query.deviceType;
    const deviceId = req.query.deviceId;
    console.log(`Connect ${deviceType} device with id: ${deviceId}`);
    const deviceUniqueKey = Device.getUniqueKey(deviceType, deviceId);
    const deviceFound = DeviceEndPoint.devices.get(deviceUniqueKey);
    if (deviceFound !== undefined) {
      console.log(`Device found`);
      console.log(`Connecting device`)
      try {
        deviceFound.connect();
        res.sendStatus(200);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    } else {
      res.sendStatus(404);
    }
  }

  disconnectDevice(req, res) {
    const deviceType = req.query.deviceType;
    const deviceId = req.query.deviceId;
    console.log(`Disconnect ${deviceType} device with id: ${deviceId}`);
    const deviceUniqueKey = Device.getUniqueKey(deviceType, deviceId);
    const deviceFound = DeviceEndPoint.devices.get(deviceUniqueKey);
    if (deviceFound !== undefined) {
      console.log(`Device found`);
      console.log(`Disconnecting device`)
      try {
        deviceFound.disconnect();
        res.sendStatus(200);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    } else {
      res.sendStatus(404);
    }
  }

  on(req, res) {
    const deviceType = req.query.deviceType;
    const deviceId = req.query.deviceId;
    console.log(`Start ${deviceType} device with id: ${deviceId}`);
    const deviceUniqueKey = Device.getUniqueKey(deviceType, deviceId);
    const deviceFound = DeviceEndPoint.devices.get(deviceUniqueKey);
    if (deviceFound !== undefined) {
      console.log(`Device found`);
      console.log(`Starting device`)
      try {
        deviceFound.on();
        res.sendStatus(200);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    } else {
      res.sendStatus(404);
    }
  }

  off(req, res) {
    const deviceType = req.query.deviceType;
    const deviceId = req.query.deviceId;
    console.log(`Stop ${deviceType} device with id: ${deviceId}`);
    const deviceUniqueKey = Device.getUniqueKey(deviceType, deviceId);
    const deviceFound = DeviceEndPoint.devices.get(deviceUniqueKey);
    if (deviceFound !== undefined) {
      console.log(`Device found`);
      console.log(`Stoping device`)
      try {
        deviceFound.off();
        res.sendStatus(200);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    } else {
      res.sendStatus(404);
    } 
  } 

}

module.exports = { DeviceEndPoint};
