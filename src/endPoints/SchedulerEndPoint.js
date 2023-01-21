const express = require('express');
const { ScheduledTask } = require('../schedule/ScheduledTask');
const SchedulerService = require('../services/SchedulerService');
const EndPoint = require('./EndPoint');

class SchedulerEndPoint extends EndPoint{
  static ROOT_PATH = '/api/schedule';

  schedulerService = SchedulerService.getService();

  constructor(app) {
    super(app);
    const router = express.Router();

    router.get(`/getAll`, this.getAllScheduledTasks.bind(this));
    router.post(`/addTask`, this.addScheduledTask.bind(this));
    router.post(`/delete`, this.deleteScheduledTask.bind(this));

    app.use(SchedulerEndPoint.ROOT_PATH, router);
  }

  addScheduledTask(req, res) {
    try {
      const scheduledTask = ScheduledTask.fromJsonObject(req.body);
      if (scheduledTask.date) {
        if (scheduledTask.getSchedule() <= new Date()) {
          res.sendStatus(403);
          return;
        }
      }
      this.schedulerService.addScheduledTask(scheduledTask);
    } catch(error) {
      console.log(error);
      res.sendStatus(500);
      return;
    }
    res.sendStatus(200);
  }

  getAllScheduledTasks(req, res) {
	  res.json([...this.schedulerService.getAllScheduledTasks()]);
  }

  deleteScheduledTask(req, res) {
    try{
      const scheduledTask = ScheduledTask.fromJsonObject(req.body);
      this.schedulerService.removeScheduledTask(scheduledTask);
    } catch(error) {
      console.log(error);
      res.sendStatus(500);
      return;
    }
    res.sendStatus(200);
  }

  close() {
    this.schedulerService.close();
  }
}

module.exports = SchedulerEndPoint;