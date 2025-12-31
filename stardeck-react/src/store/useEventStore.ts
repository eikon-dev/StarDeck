import {create} from "zustand";
import type {TaskCycle} from "@/types/task";

interface EventStore {
    events: TaskEvent[],
    emitTaskToggled: (id: string, done: boolean, cycle: TaskCycle) => void,
}

type TaskEvent = {
    id: string,
    done: boolean,
    cycle: TaskCycle,
    timestamp: number,
    type: 'task-toggled',
}

const useEventStore = create<EventStore>((set) => ({
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

export default useEventStore;