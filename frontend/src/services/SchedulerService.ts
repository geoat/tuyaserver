import WebApi from '../common/WebApi'
import {ExactDateTimeScheduledTask, RepeatingScheduledTask, Task} from '../models/ScheduledTask'

export default {
  addScheduledTask: function (task: any) {
    let scheduledTask = null;
    if (task.days)  {
      scheduledTask = new RepeatingScheduledTask();
      scheduledTask.days = task.days;
    } else {
      scheduledTask = new ExactDateTimeScheduledTask();
      scheduledTask.date = task.date;
    }
    scheduledTask.time = task.time;

    const deviceTask = new Task();
    deviceTask.deviceType=task.device.deviceType;
    deviceTask.deviceId=task.device.deviceId;
    deviceTask.state = task.state;
    scheduledTask.tasks.push(deviceTask);
    return WebApi.post('schedule/addTask', scheduledTask).then((response: any) => {
      return response
    }).catch(function () {
    })
  },
  getAllScheduledTasks: function() {
    return WebApi.get('schedule/getAll').then((response: any) => {
      return response
    }).catch(function () {
    })
  },
  deleteScheduledTask: function(task: any) {
    let scheduledTask = null;
    if (task.days)  {  
      scheduledTask = new RepeatingScheduledTask();
      scheduledTask.days = task.days;
    } else {
      scheduledTask = new ExactDateTimeScheduledTask();
      scheduledTask.date = task.date;
    }
    scheduledTask.time = task.time;
    
    return WebApi.post('schedule/delete', scheduledTask).then((response: any) => {
      return response
    }).catch(function () {
    })
  }
}