import {type Task, useTasksStore} from "@/entities/task";

export function saveTask(id: string, draft: Partial<Task>) {
  useTasksStore.getState().updateTask(id, draft);
}