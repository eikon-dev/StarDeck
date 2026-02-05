import { type Task } from '@/entities/task';
import {getDayKey} from "@/shared/lib/";

interface DailyStats {
    totalDaily: number;
    doneDaily: number;
    shouldRewardDaily: boolean;
    dayKey: string;
}

export default function selectorDailyStats(tasks: Task[]): DailyStats {
    const dailyTasks = tasks.filter(t => t.cycle === 'daily');
    const totalDaily = dailyTasks.length;
    const doneDaily = dailyTasks.filter(t => t.done).length;
    const dayKey = getDayKey();
    const shouldRewardDaily = totalDaily > 0 && doneDaily === totalDaily;

    return {
        totalDaily,
        doneDaily,
        shouldRewardDaily,
        dayKey,
    }
}
