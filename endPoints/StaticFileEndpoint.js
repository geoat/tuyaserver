const express = require('express');
const path = require('path');

class StaticFileEndpoint {
  static STATIC_DIRECTORY = '../public';

  constructor(app) {
    app.use(express.static(path.join(__dirname, StaticFileEndpoint.STATIC_DIRECTORY)));
  }
}

module.exports = StaticFileEndpoint;