import selectTasksFilter from "../entities/task/model/selectors/selectTasksFilter.ts";
import useTasksStore from "../entities/task/model/useTasksStore.ts";
import type {Priority, Task} from "../entities/task/model/types.ts";

export function useTaskFilter(filter: Priority | 'all') {
    const tasks: Task[] = useTasksStore(s => s.tasks);

    return selectTasksFilter(tasks, filter);
}