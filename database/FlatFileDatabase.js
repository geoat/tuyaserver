const Database = require('./Database')
const DevicesJsonSerializationUtil = require('./utils/DevicesJsonSerializationUtil')
const fs = require('fs')

class FlatFileDatabase extends Database {
  
  constructor(databaseName) {
    super(databaseName);
  }

  storeDevices(devices) {
    fs.writeFileSync(this.getDatabaseFile(), DevicesJsonSerializationUtil.serializeDevices([...devices.values()]));
  }

  readDevices() {
    let json = fs.readFileSync(this.getDatabaseFile(), 'utf8').replace(/\\/g, "");
    let deviceArray = DevicesJsonSerializationUtil.deserializeDevices(json);
    return deviceArray;
  }

  getDatabaseFile() {
    return this.databaseName + '.json';
  }
}

module.exports = FlatFileDatabase;
