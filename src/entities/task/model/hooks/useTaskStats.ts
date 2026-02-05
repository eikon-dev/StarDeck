import {useMemo} from "react";
import type {Task} from "../types.ts";

//TODO: Нигде не используется на v1
export function useTaskStats (tasks: Task[]) {
    return useMemo(() => {
        const total = tasks.length;
        const done = tasks.filter(t => t.done).length;
        const pct = total ? Math.round((done / total) * 100) : 0;
        return {total, done, pct};
    }, [tasks])
}