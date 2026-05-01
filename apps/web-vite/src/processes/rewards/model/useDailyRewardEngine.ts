import {useEffect} from "react";
import {useTasksStore, selectDailyStats} from '@/entities/task';
import {useFXStore} from "@/entities/fx";
import {getDayKey} from "@/shared/lib";
import {grantReward} from "@/processes/rewards/model/grantReward";

export default function useDailyRewardEngine() {
  const tasks = useTasksStore(s => s.tasks);
  const lastResetDailyDayKey = useTasksStore(s => s.lastResetDailyDayKey);
  const {createEffectItem} = useFXStore.getState();

  function grantDailyReward() {
    const {shouldRewardDaily} = selectDailyStats(tasks);
    const dayKey = getDayKey();

    if(!shouldRewardDaily) return;
    if(lastResetDailyDayKey !== dayKey) return;

    const grant = grantReward({
      kind: "daily-all",
      dayKey,
      amount: 1
    });

    if(!grant) return;

    createEffectItem({
      type: 'star',
      payload: {
        posX: 0,
        posY: -5,
      }
    })
  }

  useEffect(() => {
    grantDailyReward();

  }, [tasks, lastResetDailyDayKey])
}