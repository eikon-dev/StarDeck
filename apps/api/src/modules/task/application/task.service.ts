import {
  Inject,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { TaskCategory } from '@prisma/client';

import { Task } from '../domain/task.entity';
import { TASK_REPOSITORY } from '../domain/task.repository';
import type { TaskRepository } from '../domain/task.repository';

export type CreateTaskInput = {
  userId: bigint;
  title: string;
  description: string | null;
  category: TaskCategory;
  recurrenceRule: string | null;
  deadline: Date | null;
};

export type UpdateTaskInput = {
  title?: string;
  description?: string | null;
  category?: TaskCategory;
  recurrenceRule?: string | null;
  deadline?: Date | null;
};

@Injectable()
export class TaskService {
  public constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepository: TaskRepository,
  ) {}

  public async createTask(input: CreateTaskInput): Promise<Task> {
    const task = new Task({
      uuid: crypto.randomUUID(),
      userId: input.userId,
      title: input.title,
      description: input.description,
      category: input.category,
      recurrenceRule: input.recurrenceRule,
      deadline: input.deadline,
    });
    return this.taskRepository.create(task);
  }

  public async updateTask(
    uuid: string,
    userId: bigint,
    input: UpdateTaskInput,
  ): Promise<Task> {
    const task = await this.taskRepository.findByUuid(uuid);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    if (task.userId !== userId) {
      throw new ForbiddenException('Cannot modify task of another user');
    }

    const updated = new Task({
      ...task.props,
      title: input.title ?? task.title,
      description:
        input.description !== undefined ? input.description : task.description,
      category: input.category ?? task.category,
      recurrenceRule:
        input.recurrenceRule !== undefined
          ? input.recurrenceRule
          : task.recurrenceRule,
      deadline: input.deadline !== undefined ? input.deadline : task.deadline,
    });

    return this.taskRepository.update(updated);
  }

  public async deleteTask(uuid: string, userId: bigint): Promise<void> {
    const task = await this.taskRepository.findByUuid(uuid);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    if (task.userId !== userId) {
      throw new ForbiddenException('Cannot delete task of another user');
    }
    if (!task.id) {
      throw new Error('Task has no id, cannot delete');
    }
    await this.taskRepository.delete(task.id);
  }

  public async getUserTasks(
    userId: bigint,
    category?: TaskCategory,
  ): Promise<Task[]> {
    if (category) {
      return this.taskRepository.findByUserIdAndCategory(userId, category);
    }
    return this.taskRepository.findByUserId(userId);
  }

  public async getTaskByUuid(uuid: string, userId: bigint): Promise<Task> {
    const task = await this.taskRepository.findByUuid(uuid);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    if (task.userId !== userId) {
      throw new ForbiddenException('Cannot access task of another user');
    }
    return task;
  }
}
