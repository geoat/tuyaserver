
const FlatFileDatabase = require('./FlatFileDatabase')

class DatabaseFactory {

  static getDatabase(databaseName) {
    return new FlatFileDatabase(databaseName);
  }

}

module.exports = DatabaseFactory;