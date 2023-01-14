class EndPoint {
  constructor(app) {
    if (new.target === EndPoint) {
      throw new TypeError("Cannot construct Database instances directly. Use the factory");
    }
  }

  close() {
    throw new Error("Abstract method called");
  }
}

module.exports = EndPoint