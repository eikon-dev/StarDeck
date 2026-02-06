import {useEffect} from "react";
import { useTasksStore, selectDailyStats } from '@/entities/task';
import {useStarsStore} from "@/entities/reward";
import useFXStore from "@/entities/fx/model/useFXStore";

//TODO: Current version v1, wait v2
//TODO: Внести логические улучшения addReward & createEffectItem можно объединить в одну функцию grantDailyReward() использовать внутри useEffect
//TODO: Баг с появлением награды после resetDailyCycle при первом заходе
export default function useDailyRewardEngine() {
    const tasks = useTasksStore(s => s.tasks);
    const lastResetDailyDayKey = useTasksStore(s => s.lastResetDailyDayKey);
    const {addReward, hasDailyReward} = useStarsStore.getState()
    const {createEffectItem} = useFXStore.getState();

    useEffect(() => {
        //TODO: Вынести логику из селектора в движок
        const {shouldRewardDaily, dayKey} = selectDailyStats(tasks);

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