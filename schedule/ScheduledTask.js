const { Device } = require("../devices/Device");

class Task {
  deviceType = '';
  deviceId = '';
  state = true; //true for on, false for off.
}

class ScheduledTask {
  tasks = new Map();

  constructor() {}

  getSchedule() {

  }

  addTasks(tasks) {
    tasks.array.forEach(task => {
      this.addTask(task);
    });
  }

  addTask(task) {
    const uniqueKey = Device.getUniqueKey(task.deviceType, task.deviceId);
    this.tasks.set(uniqueKey, task);
  }

  removeTasks(tasks) {
    tasks.array.forEach(task => {
      this.remove(task);
    });
  }

  removeTask(task) {
    const uniqueKey = Device.getUniqueKey(task.deviceType, task.deviceId);
    this.tasks.remove(uniqueKey);
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
  days = [];
  time = `00:00`;

  constructor() {
    super();
  }

  getSchedule() {
    const timeParts = this.time.split(`:`);
    return `${+timeParts[0]} ${+timeParts[1]} * * ${(this.days.length>0)?this.days.join(`,`):`*`}`;
  }
}

module.exports = {ScheduledTask, ExactDateTimeScheduledTask, RepeatingScheduledTask};
