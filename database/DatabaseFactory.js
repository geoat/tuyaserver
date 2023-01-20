
const FlatFileDatabase = require('./FlatFileDatabase')

class DatabaseFactory {

  static getDatabase(databaseName, serializerUtil) {
    return new FlatFileDatabase(databaseName, serializerUtil);
  }

}

module.exports = DatabaseFactory;