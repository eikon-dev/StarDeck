import {useEffect} from "react";
import {useFXStore} from "@/entities/fx";
import {useEventStore} from "@/entities/event";
import {grantReward} from "@/processes/rewards/model/grantReward";

export default function useLongRewardEngine() {
  const {createEffectItem} = useFXStore.getState();
  const lastEvent = useEventStore(s => s.events[s.events.length - 1]); //[s.events.length - 1] последнее событие

  useEffect(() => {
    if (!lastEvent) return;

    const {id, cycle} = lastEvent;

    if (cycle !== 'long') return;

    const grant = grantReward({
      kind: "long-complete",
      taskId: id,
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
