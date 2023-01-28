const cron = require('node-cron');
const moment = require('moment');
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

  constructor() {
    this.#deviceService = DeviceService.getService();
    if (new.target === ScheduledTask) {
      throw new TypeError("Cannot construct task instances directly");
    }
  }

  schedule() {
  }

  getDeviceService() {
    return this.#deviceService;
  }
  destroy() {
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

  toJsonableObject() {
    let objectForJson = Object.assign({}, this);
    objectForJson.tasks = [];
    for(let [key, task] of this.tasks) {
      objectForJson.tasks.push(task);
    }
    return objectForJson;
  }

  toJson() {
    return JSON.stringify(this.toJsonableObject());
  }

  static fromJsonObject(jsonObject) {
    if (jsonObject.days !== undefined) {
      return RepeatingScheduledTask.fromJsonObject(jsonObject);
    } else if (jsonObject.date !== undefined) {
      return ExactDateTimeScheduledTask.fromJsonObject(jsonObject);
    } else {
      throw new Error(`Unknown type of object`);
    }
  }

  compareScheduledTasks(object) {
    if (((this instanceof RepeatingScheduledTask ) && (object instanceof RepeatingScheduledTask)) 
    || ((this instanceof ExactDateTimeScheduledTask ) && (object instanceof ExactDateTimeScheduledTask))) {
      return this.compare(object);
    } else if(this instanceof RepeatingScheduledTask) {
      return -1;
    } else {
      return 1;
    }
  }

  static compare(thisObject, thatObject) {
    return thisObject.compareScheduledTasks(thatObject);
  }

  static sort(array) {
    array = array.sort(ScheduledTask.compare);
    return array;
  }
}

class ExactDateTimeScheduledTask extends ScheduledTask {
  #timeoutHandle = null;
  date = `22/12/2023`;
  time = `14:12`;

  constructor() {
    super();
  }

  schedule() {
    const currentTime = new Date();
    const scheduledTime = this.getSchedule();
    if (scheduledTime <= currentTime) {
      return;
    }
    const timeUntilExecution = scheduledTime - currentTime;
    this.#timeoutHandle = setTimeout(() => {
      const tasks = this.getTasks().values();
      for (let task of tasks){
        if(task.state) {
          this.getDeviceService().onDevice(task.deviceType, task.deviceId);
        } else {
          this.getDeviceService().offDevice(task.deviceType, task.deviceId);
        }
      }
    }, timeUntilExecution);
  }

  destroy() {
    if(this.#timeoutHandle != null) {
      clearTimeout(this.#timeoutHandle);
      this.#timeoutHandle = null;
    }
  }

  getSchedule() {
    const date = moment(`${this.date} ${this.time}`, "DD/MM/YYYY HH:mm").toDate();
    return date;
  }

  compare(object) {
    const thisTime = this.getSchedule().getTime();
    const thatTime = object.getSchedule().getTime();

    if (thisTime != thatTime) {
        return (+thisTime) - (+thatTime)
    }
    return 0;
  }

  static fromJsonObject(jsonObject) {
    if (jsonObject.date === undefined) {
      throw new Error(`Date is not provided.`);
    }

    if (jsonObject.date.length == 0) {
      throw new Error(`The date provided is empty.`);
    }
    
    const dateMoment = moment(jsonObject.date, "DD/MM/YYYY");
    if (!dateMoment.isValid()) {
      throw new Error(`The date format is wrong. It should be DD/mm/yyyy`);
    }

    if (jsonObject.time === undefined) {
      throw new Error(`Time is not provided.`);
    }

    const timeMoment = moment(jsonObject.time, "HH:mm");
    if (!timeMoment.isValid()) {
      throw new Error(`The time format is wrong. It should be HH:mm`);
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
    return Object.assign(new ExactDateTimeScheduledTask(), jsonObject);
  }
}


class RepeatingScheduledTask extends ScheduledTask {
  #taskCron = null;
  static desiredDayValues = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  days = [];
  time = `00:00`;

  constructor() {
    super();
  }

  schedule() {
    this.#taskCron = cron.schedule(this.getSchedule(), () => {
      const tasks = this.getTasks().values();
      for (let task of tasks){
        if(task.state) {
          this.getDeviceService().onDevice(task.deviceType, task.deviceId);
        } else {
          this.getDeviceService().offDevice(task.deviceType, task.deviceId);
        }
      }
    });
  }

  destroy() {
    if(this.#taskCron != null) {
      this.#taskCron.stop();
      this.#taskCron = undefined
    }
  }

  getSchedule() {
    const timeParts = this.time.split(`:`);
    return `${+timeParts[1]} ${+timeParts[0]} * * ${(this.days.length>0)?this.days.join(`,`):`*`}`;
  }

  compare(object) {
    const thisFirstDay = this.days[0];
    const thatFirstDay = object.days[0];
    if (thisFirstDay !== thatFirstDay) {
      return Math.sign((RepeatingScheduledTask.desiredDayValues.indexOf(thisFirstDay) - RepeatingScheduledTask.desiredDayValues.indexOf(thatFirstDay)));
    }
    const thisTime = moment(this.time, "HH:mm");
    const thatTime = moment(object.time, "HH:mm");
    if (thisTime !== thatTime) {
      return Math.sign(thisTime.diff(thatTime, 'minutes'));
    }
    return 0;
  }
 
  static fromJsonObject(jsonObject) {
    if (jsonObject.days === undefined) {
      throw new Error(`Days are not provided.`);
    }

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

    if (jsonObject.time === undefined) {
      throw new Error(`Time is not provided.`);
    }

    const timeMoment = moment(jsonObject.time, "HH:mm");
    if (!timeMoment.isValid()) {
      throw new Error(`The time format is wrong. It should be HH:mm`);
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
