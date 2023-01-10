const TuyAPI = require('tuyapi');

class DeviceConnectionState {
  static CONNECTED = new DeviceConnectionState(`CONNECTED`);
  static DISCONNECTED = new DeviceConnectionState(`DISCONNECTED`);
  static INPROGRESS = new DeviceConnectionState(`INPROGRESS`);

  constructor(value) {
    this.value = value
  }
}

class DeviceState {
  static ON = new DeviceState("ON");
  static OFF = new DeviceState("OFF");
  static UNKNOWN = new DeviceState("UNKNOWN");

  constructor(value) {
    this.value = value
  }
}

class Device {
  state = DeviceState.UNKNOWN;
  connectionState = DeviceConnectionState.DISCONNECTED;
  requestedConnectionState = DeviceConnectionState.DISCONNECTED;
  constructor(deviceName, deviceType, deviceId, deviceKey) {
    this.deviceName = deviceName;
    this.deviceType = deviceType;
    this.deviceId = deviceId;
    this.deviceKey = deviceKey;
  }

  connect() {}
  disconnect() {}
  on() {}
  off() {}

  getUniqueKey() {
    return Device.getUniqueKey(this.deviceType, this.deviceId);
  }

  static getUniqueKey(deviceType, deviceId) {
    return deviceType + '_' + deviceId;
  }
}

class TuyaDevice extends Device {
  #device = undefined;
  connect() {
    if (this.#device === undefined){
      this.#device = new TuyAPI({
        id: `${this.deviceId}`,
        key: `${this.deviceKey}`
      });
    };

    this.requestedConnectionState = DeviceConnectionState.CONNECTED;
    
    // Find device on network
    this.#device.find().then(() => {
      // Connect to device
      if (this.connectionState === DeviceConnectionState.DISCONNECTED) {
        this.connectionState = DeviceConnectionState.INPROGRESS;
        this.#device.connect();
      }
    }).catch((error) => {
      console.log(error);
      this.connectionState = DeviceConnectionState.DISCONNECTED;
    });

    // Add event listeners
    this.#device.on('connected', () => {
      console.log('Connected to device');
      this.connectionState = DeviceConnectionState.CONNECTED;
    });

    this.#device.on('disconnected', () => {
      console.log('Disconnected from device.');
      this.connectionState = DeviceConnectionState.DISCONNECTED;
      this.state = DeviceState.UNKNOWN;
    });
    

    this.#device.on('data', data => {
      console.log('Data from device:', data);
      const currentState = data.dps['1'];
      console.log(`Boolean status of default property: ${currentState}.`);
      if (currentState) {
        this.state = DeviceState.ON;
      } else {
        this.state = DeviceState.OFF;
      }
    });
  }

  on() {
    this.setDefaultState(true);
  }

  off() {
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
    // Disconnect after 10 seconds
    console.log(`Scheduling disconnect`);
    this.requestedConnectionState = DeviceConnectionState.DISCONNECTED;
    setTimeout(() => 
      { 
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
      }, 10000);
  }
}

module.exports = { DeviceConnectionState, DeviceState, Device, TuyaDevice};

