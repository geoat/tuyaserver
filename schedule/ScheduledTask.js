const cron = require('node-cron');
const { Device } = require("../devices/Device");
const DeviceService = require('../services/DeviceService');

class Task {
  deviceType = '';
  deviceId = '';
  state = true; //true for on, false for off.

  static fromJsonObject(jsonObject) {
    return Object.assign(new Task(), jsonObject);
  }
}

class ScheduledTask {
  tasks = new Map();
  #deviceService = null;
  #taskCron = null;

  constructor() {
    this.#deviceService = DeviceService.getService();
  }

  schedule() {
    this.#taskCron = cron.schedule(this.getSchedule(), () => {
      const tasks = this.getTasks().values();
      for (let task of tasks){
        if(task.state) {
          this.#deviceService.onDevice(task.deviceType, task.deviceId);
        } else {
          this.#deviceService.offDevice(task.deviceType, task.deviceId);
        }
      }
    });
  }

  destroy() {
    if(this.#taskCron !== undefined) {
      this.#taskCron.stop();
      this.#taskCron = undefined
    }
  }

  getSchedule() {

  }

  getTasks() {
    return this.tasks;
  }

  addTasks(tasks) {
    for (let [key, task] of tasks){
      this.addTask(task);
    }
  }

  addTask(task) {
    const uniqueKey = Device.getUniqueKey(task.deviceType, task.deviceId);
    this.tasks.set(uniqueKey, task);
  }

  removeTasks(tasks) {
    for (let [key, task] of tasks){
      this.removeTask(task);
    }
  }

  removeTask(task) {
    const uniqueKey = Device.getUniqueKey(task.deviceType, task.deviceId);
    this.tasks.remove(uniqueKey);
  }

  toJson() {
    
  }
}

class ExactDateTimeScheduledTask extends ScheduledTask {
  date = `22/12/2023`;
  time = `14:12`;

  constructor() {
    super();
  }

  getSchedule() {
    const dateParts = this.date.split("/");
    const timeParts = this.time.split(`:`);
    const dateTime = new Date(dateParts[2], dateParts[1]-1, dateParts[0], +timeParts[0], +timeParts[1]);
    return dateTime;
  }
}


class RepeatingScheduledTask extends ScheduledTask {
  static desiredDayValues = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  days = [];
  time = `00:00`;

  constructor() {
    super();
  }

  getSchedule() {
    const timeParts = this.time.split(`:`);
    return `${+timeParts[1]} ${+timeParts[0]} * * ${(this.days.length>0)?this.days.join(`,`):`*`}`;
  }

  toJsonableObject() {
    let objectForJson = Object.assign({}, this);
    objectForJson.tasks = [];
    for(let [key, task] of this.tasks) {
      objectForJson.tasks.push(task);
    }
    return objectForJson;
  }
 
  static fromJsonObject(jsonObject) {
    if (jsonObject.days.length == 0) {
      throw new Error(`There are no valid days`);
    }

    if (jsonObject.days.length > 7) {
      throw new Error(`There are more days`);
    }

    let uniqueDays = [...new Set(jsonObject.days)];
    if (uniqueDays.length < jsonObject.days.length) {
      throw new Error(`There are non-unique entries`);
    }
    jsonObject.days = uniqueDays;

    for(const day of jsonObject.days) {
      if (!RepeatingScheduledTask.desiredDayValues.includes(day)) {
        throw new Error(`The day:${day} is an invalid day`);
      }
    }

    const timeSplits = jsonObject.time.split(":");
    if (timeSplits.length != 2) {
      throw new Error(`The time format is not proper. It should be HH:mm`);
    }

    if ((+timeSplits[0]) > 23) {
      throw new Error(`The hours should be less than or equal to 23`);
    }

    if ((+timeSplits[1]) > 59) {
      throw new Error(`The minutes should be less than or ewual to 59`);
    }

    const tasks = jsonObject.tasks;
    if (tasks != undefined) {
      jsonObject.tasks = new Map();
      for(let i = 0; i < tasks.length; i++) {
        const convertedTask = Task.fromJsonObject(tasks[i]);
        const uniqueKey = Device.getUniqueKey(convertedTask.deviceType, convertedTask.deviceId);
        jsonObject.tasks.set(uniqueKey, convertedTask);
      }
    }
    return Object.assign(new RepeatingScheduledTask(), jsonObject);
  }
}

module.exports = {ScheduledTask, ExactDateTimeScheduledTask, RepeatingScheduledTask};
