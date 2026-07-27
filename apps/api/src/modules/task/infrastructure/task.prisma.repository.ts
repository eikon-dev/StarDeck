import { Injectable } from '@nestjs/common';
import { TaskCategory, Task as PrismaTask } from '@prisma/client';

import { PrismaService } from 'shared';

import { Task } from '../domain/task.entity';
import { TaskRepository } from '../domain/task.repository';

@Injectable()
export class TaskPrismaRepository implements TaskRepository {
  public constructor(private readonly prisma: PrismaService) {}

  public async findById(id: bigint): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({ where: { id } });
    return task ? this.toDomain(task) : null;
  }

  public async findByUuid(uuid: string): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({ where: { uuid } });
    return task ? this.toDomain(task) : null;
  }

  public async findByUserId(userId: bigint): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({ where: { userId } });
    return tasks.map((t) => this.toDomain(t));
  }

  public async findByUserIdAndCategory(
    userId: bigint,
    category: TaskCategory,
  ): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: { userId, category },
    });
    return tasks.map((t) => this.toDomain(t));
  }

  public async create(task: Task): Promise<Task> {
    const created = await this.prisma.task.create({
      data: {
        uuid: task.uuid,
        userId: task.userId,
        title: task.title,
        description: task.description,
        category: task.category,
        recurrenceRule: task.recurrenceRule,
        deadline: task.deadline,
      },
    });
    return this.toDomain(created);
  }

  public async update(task: Task): Promise<Task> {
    if (!task.id) {
      throw new Error('Cannot update task without id');
    }
    const updated = await this.prisma.task.update({
      where: { id: task.id },
      data: {
        title: task.title,
        description: task.description,
        category: task.category,
        recurrenceRule: task.recurrenceRule,
        deadline: task.deadline,
      },
    });
    return this.toDomain(updated);
  }

  public async delete(id: bigint): Promise<void> {
    await this.prisma.task.delete({ where: { id } });
  }

  private toDomain(prismaTask: PrismaTask): Task {
    return new Task({
      id: prismaTask.id,
      uuid: prismaTask.uuid,
      userId: prismaTask.userId,
      title: prismaTask.title,
      description: prismaTask.description,
      category: prismaTask.category,
      recurrenceRule: prismaTask.recurrenceRule,
      deadline: prismaTask.deadline,
      createdAt: prismaTask.createdAt,
      updatedAt: prismaTask.updatedAt,
    });
  }
}
