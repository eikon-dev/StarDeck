import { Inject, Injectable, ForbiddenException } from '@nestjs/common';

import { TASK_REPOSITORY } from '../../task/domain/task.repository';
import type { TaskRepository } from '../../task/domain/task.repository';
import { TaskCompletion } from '../domain/task-completion.entity';
import { TASK_COMPLETION_REPOSITORY } from '../domain/task-completion.repository';
import type { TaskCompletionRepository } from '../domain/task-completion.repository';

export type CompleteTaskInput = {
  taskUuid: string;
  userId: bigint;
  completedAt?: Date;
};

@Injectable()
export class TaskCompletionService {
  public constructor(
    @Inject(TASK_COMPLETION_REPOSITORY)
    private readonly completionRepository: TaskCompletionRepository,
    @Inject(TASK_REPOSITORY)
    private readonly taskRepository: TaskRepository,
  ) {}

  public async completeTask(input: CompleteTaskInput): Promise<TaskCompletion> {
    const task = await this.taskRepository.findByUuid(input.taskUuid);
    if (!task || !task.id) {
      throw new ForbiddenException('Task not found');
    }
    if (task.userId !== input.userId) {
      throw new ForbiddenException('Cannot complete task of another user');
    }

    const completion = new TaskCompletion({
      taskId: task.id,
      completedAt: input.completedAt,
    });
    return this.completionRepository.create(completion);
  }

  public async getTaskHistory(
    taskUuid: string,
    userId: bigint,
  ): Promise<TaskCompletion[]> {
    const task = await this.taskRepository.findByUuid(taskUuid);
    if (!task || !task.id) {
      throw new ForbiddenException('Task not found');
    }
    if (task.userId !== userId) {
      throw new ForbiddenException('Cannot access task of another user');
    }
    return this.completionRepository.findByTaskId(task.id);
  }

  public async uncompleteTask(
    completionId: bigint,
    taskUuid: string,
    userId: bigint,
  ): Promise<void> {
    const task = await this.taskRepository.findByUuid(taskUuid);
    if (!task || !task.id) {
      throw new ForbiddenException('Task not found');
    }
    if (task.userId !== userId) {
      throw new ForbiddenException('Cannot modify task of another user');
    }
    await this.completionRepository.delete(completionId);
  }
}
