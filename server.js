const express = require('express');
const path = require('path');
const StaticFileEndpoint = require('./endPoints/StaticFileEndpoint');
const TestEndPoint = require('./endPoints/TestEndPoint');
const DeviceEndPoint = require('./endPoints/DeviceEndPoint');

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
