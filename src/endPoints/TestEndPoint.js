const express = require('express');
const EndPoint = require('./EndPoint');

class TestEndPoint extends EndPoint{
  static ROOT_PATH = '/api';

  constructor(app) {
    super(app);
    const router = express.Router();

    router.get(`/test`, this.test.bind(this));

    app.use(TestEndPoint.ROOT_PATH, router);
  }

  test(req, res) {
	  console.log('get on test received');
    const string1 = req.query.string1;
    console.log(`String:  ${string1}`);
	  res.send(`testing success`);
  }

  close() {

  }
}

module.exports = TestEndPoint;
