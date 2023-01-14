const express = require('express');
const path = require('path');
const EndPoint = require('./EndPoint');

class StaticFileEndpoint extends EndPoint {
  static STATIC_DIRECTORY = '../public';

  constructor(app) {
    super(app);
    app.use(express.static(path.join(__dirname, StaticFileEndpoint.STATIC_DIRECTORY)));
  }

  close() {

  }
}

module.exports = StaticFileEndpoint;