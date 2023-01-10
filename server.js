const express = require('express');
const TestEndPoint = require('./EndPoints/TestEndPoint');
const {DeviceEndPoint} = require('./EndPoints/DeviceEndPoint');

const app = express();
new TestEndPoint(app);
new DeviceEndPoint(app);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
