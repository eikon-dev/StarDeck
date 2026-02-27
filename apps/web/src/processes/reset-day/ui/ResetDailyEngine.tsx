import {useTasksStore} from '@/entities/task';
import {getDayKey} from "@/shared/lib";
import {useEffect} from "react";

export function ResetDailyEngine() {
  //TODO: подумать об отслеживании полуночи
  useEffect(() => {
    const {lastResetDailyDayKey, resetDailyCycle} = useTasksStore.getState();
    const dayKey = getDayKey();

    if (lastResetDailyDayKey === dayKey) {
      return;
    }

    resetDailyCycle();

    useTasksStore.setState({
      lastResetDailyDayKey: dayKey
    });
  }, [])

  return null;
};