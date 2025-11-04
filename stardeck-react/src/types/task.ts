export type Priority = 'low' | 'med' | 'high';
export type TaskCycle = 'daily' | 'long';
export type Description = string | null;

export type Task = {
  id: string;
  title: string;
  description: Description;
  done: boolean;
  createdAt: number;
  priority: Priority;
  cycle: TaskCycle;
  completions?: number[];
};