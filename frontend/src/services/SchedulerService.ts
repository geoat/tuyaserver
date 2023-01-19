import WebApi from '../common/WebApi'
import {RepeatingScheduledTask, Task} from '../models/ScheduledTask'

export default {
  addScheduledTask: function (task: any) {
    const repeatingScheduledTask = new RepeatingScheduledTask();
    repeatingScheduledTask.time = task.time;
    repeatingScheduledTask.days = task.days;
    const deviceTask = new Task();
    deviceTask.deviceType=task.device.deviceType;
    deviceTask.deviceId=task.device.deviceId;
    deviceTask.state = task.state;
    repeatingScheduledTask.tasks.push(deviceTask);
    return WebApi.post('schedule/addTask', repeatingScheduledTask).then((response: any) => {
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
  deleteScheduledTask: function(days: [], time: string) {
    const schedule = {
      days: days,
      time: time
    }
    return WebApi.post('schedule/delete', schedule).then((response: any) => {
      return response
    }).catch(function () {
    })
  }
}