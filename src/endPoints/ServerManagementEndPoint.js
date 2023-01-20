const express = require('express');
const EndPoint = require('./EndPoint');

class ServerManagementEndPoint extends EndPoint{
  static ROOT_PATH = '/api'
  closeServer = null
  constructor(app, closeServer) {
    super(app);
    this.closeServer = closeServer;
    const router = express.Router();

    router.post(`/quit`, this.quit.bind(this));

    app.use(ServerManagementEndPoint.ROOT_PATH, router);
  }

  quit() {
    console.log(`Quit request recieved.`)
    this.closeServer();
  }

  close() {

  }
}

module.exports = ServerManagementEndPoint;
