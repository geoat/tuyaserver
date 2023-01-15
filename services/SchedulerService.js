class SchedulerService {
  scheduledTasks = new Map();

  addTask(scheduledTask) {
    const existingScheduledTask = this.scheduledTasks.get(scheduledTask.getSchedule())
    if (existingScheduledTask) {
      existingScheduledTask.addTasks(scheduledTask.tasks);
      this.#insertScheduledTask(existingScheduledTask);
    } else {
      this.#insertScheduledTask(scheduledTask);
    }    
    return true;
  }

  #insertScheduledTask(scheduledTask) {
    this.scheduledTasks.set(scheduledTask.getSchedule(), scheduledTask);
  }

  removeTask(scheduledTask) {
    const existingScheduledTask = this.scheduledTasks.get(scheduledTask.getSchedule())
    if (existingScheduledTask) {
      existingScheduledTask.removeTasks(scheduledTask.tasks);
      if (existingScheduledTask.tasks.length <= 0) {
        this.#removeScheduledTask(existingScheduledTask);
      }
    }   
    return true;
  }  
  
  #removeScheduledTask(scheduledTask) {
    this.scheduledTasks.remove(scheduledTask.getSchedule());
  }

  getAllTasks() {
    return [...this.scheduledTasks.values()];
  }
}

module.exports = SchedulerService;