import {useTasksStore} from '@/entities/task';
import {useEventStore} from "@/entities/event";


export function toggleTask(id: string) {
  const res = useTasksStore.getState().toggleTask(id);
  if (!res) return;

  const {prevDone, nextDone, cycle} = res;

  //TODO: if (nextDone !== prevDone) вероятно избыточно сейчас
  if (nextDone !== prevDone) {
    useEventStore.getState().emitTaskToggled(id, nextDone, cycle)
  }
}