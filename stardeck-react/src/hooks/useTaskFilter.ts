import type {Priority, Task} from "../types/task.ts";
import {useMemo} from "react";


export function useTaskFilter(tasks: Task[], filter: Priority | 'all'): Task[] {
    return useMemo(() => {
        return tasks.filter(task => {
            if (filter === 'all') return true;
            return task.priority === filter;
        });
    }, [tasks, filter]);
}