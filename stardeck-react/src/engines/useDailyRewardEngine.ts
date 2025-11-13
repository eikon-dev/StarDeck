import {useEffect} from "react";
import useTasksStore from "../store/useTasksStore.ts";
import useStarsStore from "../store/useStarsStore.ts";
import selectorDailyStats from "../selectors/selectorDailyStats.ts";

export default function useDailyRewardEngine() {
    const tasks = useTasksStore(s => s.tasks);
    const {addReward, hasDailyReward} = useStarsStore.getState()

    useEffect(() => {
        const dailyStats = selectorDailyStats(tasks);
        if (dailyStats.shouldRewardDaily) {
            if (!hasDailyReward(dailyStats.dayKey)) {
                addReward({
                    amount: 1,
                    dayKey: dailyStats.dayKey,
                    kind: 'daily-all',
                })
            }
        }

    }, [tasks])
}