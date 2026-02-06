import {useStarsStore} from "@/entities/reward";

import {useEffect} from "react";
import useFXStore from "@/entities/fx/model/useFXStore";
import {useEventStore} from "@/entities/event";
//TODO: Current version v1, wait v2

export default function useLongRewardEngine() {
    const {addReward, hasLongReward} = useStarsStore.getState();
    const {createEffectItem} = useFXStore.getState();
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

                createEffectItem({
                    type: 'star',
                    payload: {
                        posX: 0,
                        posY: -5,
                    }
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
