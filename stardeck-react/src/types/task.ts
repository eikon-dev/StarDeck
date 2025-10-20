export type Priority = 'low' | 'med' | 'high';

export type Task = {
  id: string;
  title: string;
  done: boolean;
  createdAt: number;
  priority: Priority;
};