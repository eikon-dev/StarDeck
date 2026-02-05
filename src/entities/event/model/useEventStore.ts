import {create} from "zustand";
import type {TaskCycle} from "@/entities/task/model/types";
import type { TaskEvent } from "./types";

interface EventStore {
    events: TaskEvent[],
    emitTaskToggled: (id: string, done: boolean, cycle: TaskCycle) => void,
}
//TODO: Подумать о направление развития стора аналитики, истории, или это станет task-event
//TODO: persist (когда понадобится), лимит/очистка (например последние N)
export const useEventStore = create<EventStore>((set) => ({
    events: [],

    emitTaskToggled: (id, done, cycle) => {
        const taskEvent: TaskEvent = {
            id: id,
            done: done,
            cycle: cycle,
            timestamp: Date.now(),
            type: 'task-toggled',
        }

        set(s => ({
            events: [...s.events, taskEvent],
        }))
    },


}))