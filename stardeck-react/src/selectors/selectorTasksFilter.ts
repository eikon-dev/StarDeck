import type {Priority, Task} from "../types/task.ts";

export default function selectorTasksFilter(tasks: Task[], filter: Priority | 'all'): Task[] {
    if (filter === 'all') return tasks;
    return tasks.filter((task: Task) => task.priority === filter);
}