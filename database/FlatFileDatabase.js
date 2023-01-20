const Database = require('./Database')
const DevicesJsonSerializationUtil = require('./utils/DevicesJsonSerializationUtil')
const fs = require('fs')

class FlatFileDatabase extends Database {
  static DATABASE_DIR="FileDatabase/";
  constructor(databaseName, serializerUtil) {
    super(databaseName, serializerUtil);
    const fileExists = fs.existsSync(this.getDatabaseFile());
    if (!fileExists) {
      if(!fs.existsSync(FlatFileDatabase.DATABASE_DIR)) {
        fs.mkdirSync(FlatFileDatabase.DATABASE_DIR);
      }
      fs.writeFileSync(this.getDatabaseFile(), JSON.stringify([]))
    }
  }

  store(objectsMap) {
    fs.writeFileSync(this.getDatabaseFile(), this.serializerUtil.serialize([...objectsMap.values()]));
  }

  read() {
    let json = fs.readFileSync(this.getDatabaseFile(), 'utf8').replace(/\\/g, "");
    let deviceArray = this.serializerUtil.deserialize(json);
    return deviceArray;
  }

  getDatabaseFile() {
    return FlatFileDatabase.DATABASE_DIR + this.databaseName + '.json';
  }
}

module.exports = FlatFileDatabase;
