const { ScheduledTask } = require('../../schedule/ScheduledTask');
const SerializerUtil = require('./SerializerUtil');

class TasksJsonSerializationUtil extends SerializerUtil{

  constructor() {
    super();
  }

  serialize(tasks) {
    let jsonableObjectArray = [];
    for(let task of tasks) {
      jsonableObjectArray.push(task.toJsonableObject())
    }
    return JSON.stringify(jsonableObjectArray);
  }

  deserialize(json) {
    let deviceArray = JSON.parse(json);

    for (let i = 0; i < deviceArray.length; i++) {
      deviceArray[i] = ScheduledTask.fromJsonObject(deviceArray[i]);
    }
    return deviceArray;
  }
}

module.exports = TasksJsonSerializationUtil;