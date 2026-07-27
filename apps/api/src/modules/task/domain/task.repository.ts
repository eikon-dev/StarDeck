import { TaskCategory } from '@prisma/client';

import { Task } from './task.entity';

export const TASK_REPOSITORY = Symbol('TASK_REPOSITORY');

export interface TaskRepository {
  findById(id: bigint): Promise<Task | null>;
  findByUuid(uuid: string): Promise<Task | null>;
  findByUserId(userId: bigint): Promise<Task[]>;
  findByUserIdAndCategory(
    userId: bigint,
    category: TaskCategory,
  ): Promise<Task[]>;
  create(task: Task): Promise<Task>;
  update(task: Task): Promise<Task>;
  delete(id: bigint): Promise<void>;
}
