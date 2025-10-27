export type Priority = 'low' | 'med' | 'high';
export type Kind = 'daily' | 'long';

export type Task = {
  id: string;
  title: string;
  done: boolean;
  createdAt: number;
  priority: Priority;
  kind: Kind;
  completions?: number[];
};