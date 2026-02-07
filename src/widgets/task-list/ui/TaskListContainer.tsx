import {toggleTask} from "@/features/task-toggle/model/toggleTask";
import {removeTask} from "@/features/task-remove/model/removeTask";
import {useSortedTasks} from "@/entities/task";
import TaskListView from "@/widgets/task-list/ui/TaskListView";

export default function TaskListContainer() {

  const tasks = useSortedTasks();

  return (
    <TaskListView
      tasks={tasks}
      onToggleTask={toggleTask}
      onRemoveTask={removeTask}
    />
  );
}

