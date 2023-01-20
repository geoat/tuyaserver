const Device = require('../devices/Device');

class Database {
  databaseName = '';
  serializerUtil = undefined;

  constructor(databaseName, serializerUtil) {
    if (new.target === Database) {
      throw new TypeError("Cannot construct Database instances directly. Use the factory");
    }
    this.databaseName = databaseName;
    this.serializerUtil = serializerUtil;
  }


  store(objectsMap) {
    throw new Error("Abstract method called");
  }

  read() {
    throw new Error("Abstract method called");
  }
}

module.exports = Database;