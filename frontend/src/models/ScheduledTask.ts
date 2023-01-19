export class Task {
  deviceType = '';
  deviceId = '';
  state = true; //true for on, false for off.
}

export class ScheduledTask {
  tasks: Task[] = [];
}

export class ExactDateTimeScheduledTask extends ScheduledTask {
  date = `22/12/2023`;
  time = `14:12`;
}

export class RepeatingScheduledTask extends ScheduledTask {
  days = [];
  time = `00:00`;
}