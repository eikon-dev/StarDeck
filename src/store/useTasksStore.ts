import {create} from 'zustand';
import {persist} from "zustand/middleware";
import type {NewTaskInput, Task} from "@/types/task";
import useEventStore from "./useEventStore.ts";

//TODO: Current version v1, wait v2
//TODO: Добавить версионирование
//TODO: Добавил сохранения данных в persist lastResetDailyDayKey проверить правильность, и нужна ли миграция

interface TaskStore {
    tasks: Task[],
    lastResetDailyDayKey: string | null,
    hasHydrated: boolean,

    setHasHydrated: () => void,

    addTask: (input: NewTaskInput) => void,
    removeTask: (id: string) => void,
    toggleTask: (id: string) => void,
    resetDailyCycle: () => void,
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

const useTasksStore = create<TaskStore>()(
    persist(
        (set, get) => ({

            tasks: [],
            lastResetDailyDayKey: null,
            hasHydrated: false,

            setHasHydrated: () => set({hasHydrated: true}),

            addTask: (taskInput: NewTaskInput) => {
                const task: Task = {
                    id: crypto.randomUUID?.() ?? String(Date.now() + Math.random()),
                    title: taskInput.title,
                    description: taskInput.description ?? null,
                    done: false,
                    holoActive: false,
                    holoPlayed: false,
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
                const task = get().tasks.find(t => t.id === id);
                if (!task) return; // чтоб TS не ругался TaskItem всегда передает task.id

                const {done: prevDone, cycle} = task; //де структуризация лаконично и красиво

                set(s => ({
                    tasks: s.tasks.map(t => (t.id === id ? {...t, done: !t.done} : t))
                }))

                // if (prevDone === undefined) return;
                // ненужен потому что TaskItem Всегда передает id задачи
                //     function handleToggle() {
                //         onToggle(task.id)
                //     }

                const nextDone = !prevDone;

                if (nextDone !== prevDone) {
                    useEventStore.getState().emitTaskToggled(id, nextDone, cycle)
                }

            },

            resetDailyCycle: () => {
                set((s) => {
                    //флаг changed = false, чтоб избежать ре рендеров
                    const changed = s.tasks.some(t => t.cycle === 'daily' && t.done === true);
                    if (!changed) return s;

                    const nextTasks = s.tasks.map(t =>
                        t.cycle === 'daily'
                        && t.done
                            ? {...t, done: false}
                            : t);

                    return (
                        {
                            tasks: nextTasks,
                        }
                    )
                })
            },

        }),
        {
            name: "tasks-store",
            partialize: (state) => ({
                tasks: state.tasks,
                lastResetDailyDayKey: state.lastResetDailyDayKey,
            }),
            onRehydrateStorage: () => (state, error) => {
                if (error) {
                    console.error(error);
                    return;
                }

                state?.setHasHydrated();
            },
        })
)

export default useTasksStore;