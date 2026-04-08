import {create} from 'zustand';
import {persist} from "zustand/middleware";
import type {NewTaskInput, Task, TaskToggleResult} from "@/entities/task/model/types";

//TODO: Current version v1, wait v2
//TODO: Добавить версионирование
//TODO: Добавил сохранения данных в persist lastResetDailyDayKey проверить правильность, и нужна ли миграция

interface TaskStore {
  tasks: Task[],
  lastResetDailyDayKey: string | null,
  hasHydrated: boolean,

  setHasHydrated: () => void,

  addTask: (input: NewTaskInput) => void,
  updateTask: (id: string, input: Partial<Task>) => void,
  removeTask: (id: string) => void,
  toggleTask: (id: string) => TaskToggleResult | null,
  resetDailyCycle: () => void,
}

// будущее расширение store
// interface TaskStore {
//     tasks: Types[]
//     dailyFrozen: boolean
//     lastRewardDate: number | null
//     addTask: (input: NewTaskInput) => void
//     toggleTask: (id: string) => void
//     removeTask: (id: string) => void
//     resetDailyCycle: () => void
//     checkDailyCompletion: () => void
// }

export const useTasksStore = create<TaskStore>()(
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

      updateTask: (id: string, input: Partial<Task>) => {
        set(s => ({
          tasks: s.tasks.map(t => t.id === id ? {...t, ...input} : t)
        }))
      },

      removeTask: (id: string) => {
        set(s => ({
          tasks: s.tasks.filter(t => t.id !== id)
        }))
      },
      //TODO:COMPLETED Исправляем стор не знает о EventStore
      toggleTask: (id: string): TaskToggleResult | null => {
        const task = get().tasks.find(t => t.id === id);
        if (!task) return null; // чтоб TS не ругался TaskItem всегда передает task.id

        const {done: prevDone, cycle} = task;
        const nextDone = !prevDone;

        set(s => ({
          tasks: s.tasks.map(t =>
            t.id === id ? {...t, done: nextDone} : t
          ),
        }))

        return {
          taskId: id,
          prevDone,
          nextDone,
          cycle,
        };
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