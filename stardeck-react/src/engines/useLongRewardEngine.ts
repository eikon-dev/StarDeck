import useStarsStore from "../store/useStarsStore.ts";
import useEventStore from "../store/useEventStore.ts";
import {useEffect} from "react";

//TODO: Переходим на EventStore => COMPLETED
export default function useLongRewardEngine() {
    const {addReward, hasLongReward} = useStarsStore.getState();
    const lastEvent = useEventStore(s => s.events[s.events.length - 1]); //[s.events.length - 1] последнее событие

    useEffect(() => {
        if (!lastEvent) return;

        const {id, type, cycle} = lastEvent;

        if (type === 'task-toggled' && cycle === 'long') {
            if (!hasLongReward(id)) {
                addReward({
                    amount: 1,
                    taskId: id,
                    kind: "long-complete",
                })
            }
        }
    }, [lastEvent]);
}


// useEventStore.subscribe(s => {
//     s.events[s.events.length - 1],
//         (lastEvent) => {
//             if (lastEvent?.type === 'task-toggled' && lastEvent?.cycle === 'long') {
//                 if (!hasLongReward(lastEvent?.id)) {
//                     addReward({
//                         amount: 1,
//                         taskId: lastEvent?.id,
//                         kind: "long-complete",
//                     })
//                 }
//             }
//         }
// )
// }
