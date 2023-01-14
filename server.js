const express = require('express');
const path = require('path');
const StaticFileEndpoint = require('./endPoints/StaticFileEndpoint');
const TestEndPoint = require('./endPoints/TestEndPoint');
const DeviceEndPoint = require('./endPoints/DeviceEndPoint');
const ServerManagementEndPoint = require('./endPoints/ServerManagementEndPoint');

const app = express();
const staticFileEndpoint = new StaticFileEndpoint(app)
const testEndPoint = new TestEndPoint(app);
const deviceEndPoint = new DeviceEndPoint(app);
const serverManagementEndPoint = new ServerManagementEndPoint(app, closeServer);

const server = app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

process.on('uncaughtException', function (err) {
  // handle the error safely
  console.log(err);
})

process.on('SIGINT', () => {
  console.log(`Closing the server`);
  closeServer();
});

function closeServer() {
  server.close(() => {
    try {
      staticFileEndpoint.close();
      testEndPoint.close();
      deviceEndPoint.close();
      serverManagementEndPoint.close();
    } catch(error) {
      console.log(`Error in closing the server`);
    }
    console.log('Server closed');
    process.exit();
  });
}
