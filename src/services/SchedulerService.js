const DatabaseFactory = require("../database/DatabaseFactory");
const TasksJsonSerializationUtil = require("../database/utils/TasksJsonSerializationUtil");
const {ScheduledTask } = require("../schedule/ScheduledTask");
const DeviceService = require("./DeviceService");

class SchedulerService {
  static #singleton = undefined;
  static #database = undefined;
  static #scheduledTasks = new Map();

  constructor() {
    this.deviceService = DeviceService.getService();
  }

  static getService() {
    if (SchedulerService.#singleton ===  undefined){
      SchedulerService.#singleton = new SchedulerService();
      SchedulerService.#database = DatabaseFactory.getDatabase(`tasks`, new TasksJsonSerializationUtil());
      const taskArray = SchedulerService.#database.read();
      for (let task of taskArray) {
        SchedulerService.#singleton.#insertScheduledTask(task);
        task.schedule();
      };
    }
    return SchedulerService.#singleton;
  }

  addScheduledTask(scheduledTask) {
    const existingScheduledTask = SchedulerService.#scheduledTasks.get(scheduledTask.getSchedule().toString())
    if (existingScheduledTask) {
      existingScheduledTask.addTasks(scheduledTask.tasks);
      this.#insertScheduledTask(existingScheduledTask);
    } else {
      this.#insertScheduledTask(scheduledTask);
      scheduledTask.schedule();
    }
    SchedulerService.#database.store(SchedulerService.#scheduledTasks);
    return true;
  }

  #insertScheduledTask(scheduledTask) {
    SchedulerService.#scheduledTasks.set(scheduledTask.getSchedule().toString(), scheduledTask);
  }

  removeScheduledTask(scheduledTask) {
    const existingScheduledTask = SchedulerService.#scheduledTasks.get(scheduledTask.getSchedule().toString())
    if (existingScheduledTask) {
      existingScheduledTask.removeTasks(scheduledTask.tasks);
      if ((existingScheduledTask.tasks.size <= 0) || (scheduledTask.tasks.size == 0 )) {
        this.#deleteScheduledTask(existingScheduledTask);
        existingScheduledTask.destroy();
      }
      SchedulerService.#database.store(SchedulerService.#scheduledTasks);
    }   
    return true;
  }
  
  #deleteScheduledTask(scheduledTask) {
    SchedulerService.#scheduledTasks.delete(scheduledTask.getSchedule().toString());
  }

  getAllScheduledTasks() {
    let objects = [];
    for (let [key, task] of SchedulerService.#scheduledTasks) {
      objects.push(task);
    }

    const sortedObjects = ScheduledTask.sort(objects);

    let jsonableObjects = [];
    for (let task of sortedObjects) {
      jsonableObjects.push(task.toJsonableObject());
    }
    return jsonableObjects;
  }

  close() {
    console.log(`Clearing scheduled tasks`);
    SchedulerService.#scheduledTasks.forEach(task => {
      task.destroy();
    });
  }
}

module.exports = SchedulerService;