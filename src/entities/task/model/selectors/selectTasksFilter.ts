import type {Priority, Task} from "@/entities/task";

export function selectTasksFilter(tasks: Task[], filter: Priority | 'all'): Task[] {
    if (filter === 'all') return tasks;
    return tasks.filter((task: Task) => task.priority === filter);
}