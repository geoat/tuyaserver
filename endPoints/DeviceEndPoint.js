const express = require('express');

const DeviceService = require('../services/DeviceService');
const EndPoint = require('./EndPoint');

class DeviceEndPoint extends EndPoint {
  static ROOT_PATH = '/api/device';
  deviceService = DeviceService.getService();
  constructor(app) {
    super(app);
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
    if (this.deviceService.hasDevice(deviceType, deviceId)) {
      res.sendStatus(409)
      return;
    }
    //further clean-up required
    switch (deviceType) {
      case 'tuya':
        this.deviceService.addTuyaDevice(deviceName, deviceType, deviceId, deviceKey);
        console.log(`Device added`);
        res.sendStatus(200)
        break;
      default:
        console.log(`Device type not known`);
        res.sendStatus(403);
    }
  }

  getDevice(req, res) {
    const deviceType = req.query.deviceType;
    const deviceId = req.query.deviceId;
    console.log(`Getting ${deviceType} device with id: ${deviceId}`);
    const deviceFound = this.deviceService.getDevice(deviceType, deviceId);
    if (deviceFound !== undefined) {
      console.log(`Device found`);
      res.json(deviceFound);
    } else {
      res.sendStatus(404);
    }
  }

  getAllDevices(req, res) {
    res.json([...this.deviceService.getAllDevices()]);
  }

  deleteDevice(req, res) {
    const deviceType = req.query.deviceType;
    const deviceId = req.query.deviceId;
    console.log(`Delete ${deviceType} device with id: ${deviceId}`);
    if (this.deviceService.deleteDevice(deviceType, deviceId)) {
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
    if (this.deviceService.hasDevice(deviceType, deviceId)) {
      console.log(`Device found`);
      try {
        this.deviceService.connectDevice(deviceType, deviceId);
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
    if (this.deviceService.hasDevice(deviceType, deviceId)) {
      console.log(`Device found`);
      try {
        this.deviceService.disconnectDevice(deviceType, deviceId);
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
    if (this.deviceService.hasDevice(deviceType, deviceId)) {
      console.log(`Device found`);
      console.log(`Starting device`)
      try {
        this.deviceService.onDevice(deviceType, deviceId);
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
    if (this.deviceService.hasDevice(deviceType, deviceId)) {
      console.log(`Device found`);
      console.log(`Stoping device`)
      try {
        this.deviceService.offDevice(deviceType, deviceId);
        res.sendStatus(200);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    } else {
      res.sendStatus(404);
    } 
  }

  close() {
    this.deviceService.close();
  }
}

module.exports = DeviceEndPoint;
