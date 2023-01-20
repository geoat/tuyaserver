const TuyAPI = require('tuyapi');

class DeviceConnectionState {
  static CONNECTED = `CONNECTED`;
  static DISCONNECTED = `DISCONNECTED`;
  static INPROGRESS = `INPROGRESS`;
}

class Device {
  state = null;
  requestedState = null
  connectionState = DeviceConnectionState.DISCONNECTED;
  requestedConnectionState = DeviceConnectionState.DISCONNECTED;
  constructor(deviceName, deviceType, deviceId, deviceKey) {
    if (new.target === Device) {
      throw new TypeError("Cannot construct Database instances directly. Use the factory");
    }
    this.deviceName = deviceName;
    this.deviceType = deviceType;
    this.deviceId = deviceId;
    this.deviceKey = deviceKey;
  }

  connect() {
    throw new Error("Abstract method called");
  }

  resumeConnectedState() {
    throw new Error("Abstract method called");
  }
  disconnect() {
    throw new Error("Abstract method called");
  }
  on() {
    throw new Error("Abstract method called");
  }
  off() {
    throw new Error("Abstract method called");
  }

  getUniqueKey() {
    return Device.getUniqueKey(this.deviceType, this.deviceId);
  }

  static getUniqueKey(deviceType, deviceId) {
    return deviceType + '_' + deviceId;
  }

  toJsonableObject() {
    return this;
  }


  toJson() {
    return JSON.stringify(this);
  }
  // Deserialize a JSON string to an object
  static fromJson(json) {
    let obj = JSON.parse(json);
    if (obj.deviceType === 'tuya') {
        const device = Object.assign(new TuyaDevice(), obj);
        //reset live states
        device.connectionState = DeviceConnectionState.DISCONNECTED;
        device.state = null;
      return device;
    } else {
      throw new TypeError("Not supported device type");
    }
  }
}

class TuyaDevice extends Device {
  #device = undefined;
  connect() {
    this.requestedConnectionState = DeviceConnectionState.CONNECTED;

    if (this.connectionState !== DeviceConnectionState.DISCONNECTED) {
      console.log(`Device is already connected or connection in progress`);
      return;
    }

    if (this.#device === undefined){
      this.#device = new TuyAPI({
        id: `${this.deviceId}`,
        key: `${this.deviceKey}`
      });
    };
    
    this.connectionState = DeviceConnectionState.INPROGRESS;

    // Find device on network
    this.#device.find().then(() => {
      console.log(`Found device in the network`);
      // Connect to device
      try {
        this.#device.connect();
      } catch(error) {
        console.log(error);
        this.connectionState = DeviceConnectionState.DISCONNECTED;
      }
    }).catch((error) => {
      console.log(error);
      this.connectionState = DeviceConnectionState.DISCONNECTED;
      return;
    });

    // Add event listeners
    this.#device.on('connected', () => {
      console.log('Connected to device');
      this.connectionState = DeviceConnectionState.CONNECTED;
    });

    this.#device.on('disconnected', () => {
      console.log('Disconnected from device.');
      this.connectionState = DeviceConnectionState.DISCONNECTED;
      this.state = null;
    });

    this.#device.on('error', (error) => {
      console.log('Error in device.', error);
      this.connectionState = DeviceConnectionState.DISCONNECTED;
      this.state = DeviceState.UNKNOWN;
    });
    

    this.#device.on('data', data => {
      console.log('Data from device:', data);
      const currentState = data.dps['1'];
      console.log(`Boolean status of default property: ${currentState}.`);
      if (currentState) {
        this.state = true;
      } else {
        this.state = false;
      }
    });
  }

  resumeConnectedState() {
    try {
      if (this.requestedConnectionState === DeviceConnectionState.CONNECTED
        && this.connectionState !== DeviceConnectionState.CONNECTED) {
        console.log(`Trying to re-connect device.`);
        this.connect();
      } else if (this.requestedConnectionState === DeviceConnectionState.DISCONNECTED
        && this.connectionState !== DeviceConnectionState.DISCONNECTED) {
          console.log(`Trying to disconnect device:{${this}}.`);
        this.disconnect();
      }
    } catch (error) {
      console.log(`Auto re-connect/disconnect of device failed`);
    }
  }

  on() {
    if (this.connectionState !== DeviceConnectionState.CONNECTED) {
      console.log(`Device is not yet connected`);
      return;
    }
    if (this.state) {
      console.log(`Device is already on, Ignoring.`);
      return;
    }
    this.requestedState = true;
    this.setDefaultState(true);
  }

  off() {
    if (this.connectionState !== DeviceConnectionState.CONNECTED) {
      console.log(`Device is not yet connected`);
      return;
    }
    if (!this.state) {
      console.log(`Device is already off, Ignoring.`);
      return;
    }
    this.requestedState = false;
    this.setDefaultState(false);
  }

  setDefaultState(value) {
    if (this.connectionState === DeviceConnectionState.CONNECTED) {
      console.log('Setting default state to true');
      this.#device.set({set: value});
    } else {
      console.log('Device not in connected state');
    }
  }

  disconnect() {
    this.requestedConnectionState = DeviceConnectionState.DISCONNECTED;
    if (this.connectionState === DeviceConnectionState.DISCONNECTED) {
      console.log(`Already disconnected`);
      return
    }
     new Promise(() => {       
       if (this.connectionState !== DeviceConnectionState.DISCONNECTED) {
         console.log(`Disconnecting`);
         this.#device.disconnect();
       } else {
         console.log(`Already disconnected`);
       }
     }).then(() => {
       this.connectionState = DeviceConnectionState.DISCONNECTED;
       console.log(`Device disconnected`);
     }).catch((error) => {
       console.log(error);
     });
  }
}

module.exports = { DeviceConnectionState, Device, TuyaDevice};

