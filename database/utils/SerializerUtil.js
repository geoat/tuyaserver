class SerializerUtil {
  constructor() {
    if (new.target === SerializerUtil) {
      throw new TypeError("Cannot construct Database instances directly. Use the factory");
    }
  }

  serialize(objects) {
    throw new Error("Abstract method called");
  }

  deserialize(json) {
    throw new Error("Abstract method called");
  }
}
module.exports = SerializerUtil;