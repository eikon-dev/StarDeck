import {type TaskCycle} from "@/entities/task";

export type TaskEvent = {
  id: string,
  done: boolean,
  cycle: TaskCycle,
  timestamp: number,
  type: 'task-toggled',
}