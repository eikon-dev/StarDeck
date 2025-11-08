import {create} from 'zustand';
import type {Description, Priority, Task, TaskCycle} from "../types/task.ts";

interface TaskStore {
    tasks: Task[],

    addTask: (input: NewTaskInput) => void,
    removeTask: (id: string) => void,
    toggleTask: (id: string) => void,
    resetDailyCycle: () => void,
}

type NewTaskInput = {
    title: string,
    description?: Description,
    priority: Priority,
    cycle: TaskCycle,
}
// будущее расширение store
// interface TaskStore {
//     tasks: Task[]
//     dailyFrozen: boolean
//     lastRewardDate: number | null
//     addTask: (input: NewTaskInput) => void
//     toggleTask: (id: string) => void
//     removeTask: (id: string) => void
//     resetDailyCycle: () => void
//     checkDailyCompletion: () => void
// }

const useTasksStore = create<TaskStore>((set,) => ({

    tasks: [],


    addTask: (taskInput: NewTaskInput) => {
        const task: Task = {
            id: crypto.randomUUID?.() ?? String(Date.now() + Math.random()),
            title: taskInput.title,
            description: taskInput.description ?? null,
            done: false,
            createdAt: Date.now(),
            priority: taskInput.priority,
            cycle: taskInput.cycle,
        }

        set(s => ({
            tasks: [...s.tasks, task]
        }))
    },

    removeTask: (id: string) => {
        set(s => ({
            tasks: s.tasks.filter(t => t.id !== id)
        }))
    },

    toggleTask: (id: string) => {
        set(s => ({
            tasks: s.tasks.map(t => (t.id === id ? {...t, done: !t.done} : t))
        }))
    },

    resetDailyCycle: () => {

    },

}))

export default useTasksStore