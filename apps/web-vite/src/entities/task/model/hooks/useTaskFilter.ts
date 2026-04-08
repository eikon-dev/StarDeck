import {
  type Priority,
  type Task,
  useTasksStore,
  selectTasksFilter
} from "@/entities/task";

//TODO: Нигде не используется на v1
export function useTaskFilter(filter: Priority | 'all') {
  const tasks: Task[] = useTasksStore.getState().tasks;

  return selectTasksFilter(tasks, filter);
}