import useTasksStore from "@/store/useTasksStore";
import getDayKey from "@/utils/getDayKey";
import {useEffect} from "react";

export default function ResetDailyEngine () {
    //TODO: подумать об отслеживании полуночи
    useEffect(() => {
        const {lastResetDailyDayKey, resetDailyCycle } = useTasksStore.getState();
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