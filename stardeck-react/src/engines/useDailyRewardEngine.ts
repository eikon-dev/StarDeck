import {useEffect} from "react";
import useTasksStore from "../store/useTasksStore.ts";
import useStarsStore from "../store/useStarsStore.ts";
import selectorDailyStats from "../selectors/selectorDailyStats.ts";

export default function useDailyRewardEngine() {
    const tasks = useTasksStore(s => s.tasks);
    const {addReward, hasDailyReward} = useStarsStore.getState()

    useEffect(() => {
        const {shouldRewardDaily, dayKey} = selectorDailyStats(tasks);

        //guard clauses
        if (!shouldRewardDaily) return;
        if (hasDailyReward(dayKey)) return;

        addReward({
            amount: 1,
            dayKey,
            kind: 'daily-all',
        })
    }, [tasks])
}