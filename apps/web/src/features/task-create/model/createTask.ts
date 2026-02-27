import {type NewTaskInput, useTasksStore} from "@/entities/task";

export function createTask(props: NewTaskInput) {
  useTasksStore.getState().addTask(props);
}