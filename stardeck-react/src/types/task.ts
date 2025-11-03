export type Priority = 'low' | 'med' | 'high';
export type TaskCycle = 'daily' | 'long';

export type Task = {
  id: string;
  title: string;
  done: boolean;
  createdAt: number;
  priority: Priority;
  cycle: TaskCycle;
  completions?: number[];
};