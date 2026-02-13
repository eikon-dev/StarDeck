import {useTasksStore} from "@/entities/task";

export function selectTaskEditDraft(id: string) {
  const {title, description, priority} = useTasksStore
    .getState()
    .tasks
    .find(task => task.id === id) ?? {};

  if(description === null) {
    return {title, priority, description: undefined}
  }

  return { title, priority, description }
}