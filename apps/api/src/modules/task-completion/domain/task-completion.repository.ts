import { TaskCompletion } from './task-completion.entity';

export const TASK_COMPLETION_REPOSITORY = Symbol('TASK_COMPLETION_REPOSITORY');

export interface TaskCompletionRepository {
  findByTaskId(taskId: bigint): Promise<TaskCompletion[]>;
  findByTaskIdSince(taskId: bigint, since: Date): Promise<TaskCompletion[]>;
  create(completion: TaskCompletion): Promise<TaskCompletion>;
  delete(id: bigint): Promise<void>;
}
