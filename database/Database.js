const Device = require('../devices/Device');

class Database {
  databaseName = '';

  constructor(databaseName) {
    if (new.target === Database) {
      throw new TypeError("Cannot construct Database instances directly. Use the factory");
    }
    this.databaseName = databaseName;
  }


  storeDevices(devices) {
    throw new Error("Abstract method called");
  }

  readDevices() {
    throw new Error("Abstract method called");
  }
}

module.exports = Database;