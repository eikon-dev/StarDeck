import type {Task} from "../types/task.ts";
import getDayKey from "../utils/getDayKey.ts";

interface DailyStats {
    totalDaily: number;
    doneDaily: number;
    shouldRewardDaily: boolean;
    dayKey: string;
}

const selectorDailyStats = (tasks: Task[]): DailyStats => {
    const dailyTasks = tasks.filter(t => t.cycle === 'daily');
    const totalDaily = dailyTasks.length;
    const doneDaily = dailyTasks.filter(t => t.done).length;
    const dayKey = getDayKey()

    if (doneDaily === totalDaily && totalDaily > 0) {
        return {
            totalDaily,
            doneDaily,
            shouldRewardDaily: true,
            dayKey: dayKey,
        }
    } else {
        return {
            totalDaily,
            doneDaily,
            shouldRewardDaily: false,
            dayKey: dayKey,
        }
    }
}

export default selectorDailyStats;