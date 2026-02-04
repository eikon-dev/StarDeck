export type Priority = 'low' | 'med' | 'high';
export type TaskCycle = 'daily' | 'long';
export type Description = string | null;

export type Task = {
  id: string;
  title: string;
  description: Description;
  done: boolean;
  holoActive: boolean;
  holoPlayed: boolean;
  createdAt: number;
  priority: Priority;
  cycle: TaskCycle;
  completions?: number[];
};

export type NewTaskInput = {
    title: string,
    description?: Description,
    priority: Priority,
    cycle: TaskCycle,
}

export type TaskToggleResult = {
    taskId: string,
    prevDone: boolean,
    nextDone: boolean,
    cycle: TaskCycle,
}