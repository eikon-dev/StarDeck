import type {Task} from "../types/task.ts";
import {useMemo} from "react";

interface TasksSort {
    daily: Task[],
    long: Task[],
}

export default function selectorTasksSort(tasks: Task[]): TasksSort {
    //TODO: Исправить использование хука в селекторе
    const {daily, long} = useMemo(() => {
        const daily: Task[] = [];
        const long: Task[] = [];

        for (const t of tasks) {
            (t.cycle === 'daily' ? daily : long).push(t);
        }

        // const sort = (a: Task, b: Task) =>
        //     Number(a.done) - Number(b.done) || b.createdAt - a.createdAt;
        //
        // daily.sort(sort);
        // long.sort(sort);

        return {daily, long};
    }, [tasks])

    return {daily, long};
}