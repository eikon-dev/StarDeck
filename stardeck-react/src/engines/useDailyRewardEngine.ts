import {useEffect} from "react";
import useTasksStore from "../store/useTasksStore.ts";
import useStarsStore from "../store/useStarsStore.ts";
import selectorDailyStats from "../selectors/selectorDailyStats.ts";
import useFXStore from "@/store/useFXStore";
//TODO: Current version v1, wait v2
//TODO: Внести логические улучшения addReward & createEffectItem можно объединить в одну функцию grantDailyReward() использовать внутри useEffect

export default function useDailyRewardEngine() {
    const {tasks, lastResetDailyDayKey} = useTasksStore.getState();
    const {addReward, hasDailyReward} = useStarsStore.getState()
    const {createEffectItem} = useFXStore.getState();

    useEffect(() => {
        const {shouldRewardDaily, dayKey} = selectorDailyStats(tasks);

        //guard clauses
        if (lastResetDailyDayKey !== dayKey) return;
        if (!shouldRewardDaily) return;
        if (hasDailyReward(dayKey)) return;

        addReward({
            amount: 1,
            dayKey,
            kind: 'daily-all',
        })

        createEffectItem({
            type: 'star',
            payload: {
                posX: 0,
                posY: -5,
            }
        })
    }, [tasks])
}