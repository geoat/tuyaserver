const express = require('express');
const app = express();

class TestEndPoint {
  static ROOT_PATH = '/api';

  constructor(app) {
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
}

module.exports = TestEndPoint;
