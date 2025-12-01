import selectorTasksFilter from "../selectors/selectorTasksFilter.ts";
import useTasksStore from "../store/useTasksStore.ts";
import type {Priority, Task} from "../types/task.ts";

export function useTaskFilter(filter: Priority | 'all') {
    const tasks: Task[] = useTasksStore(s => s.tasks);

    return selectorTasksFilter(tasks, filter);
}