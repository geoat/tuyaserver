const express = require('express');
const path = require('path');
const StaticFileEndpoint = require('./EndPoints/StaticFileEndpoint');
const TestEndPoint = require('./EndPoints/TestEndPoint');
const DeviceEndPoint = require('./EndPoints/DeviceEndPoint');

const app = express();
new StaticFileEndpoint(app)
new TestEndPoint(app);
new DeviceEndPoint(app);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

process.on('uncaughtException', function (err) {
  // handle the error safely
  console.log(err);
})
