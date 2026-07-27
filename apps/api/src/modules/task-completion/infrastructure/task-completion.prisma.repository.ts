import { Injectable } from '@nestjs/common';
import { TaskCompletion as PrismaTaskCompletion } from '@prisma/client';

import { PrismaService } from 'shared';

import { TaskCompletion } from '../domain/task-completion.entity';
import { TaskCompletionRepository } from '../domain/task-completion.repository';

@Injectable()
export class TaskCompletionPrismaRepository implements TaskCompletionRepository {
  public constructor(private readonly prisma: PrismaService) {}

  public async findByTaskId(taskId: bigint): Promise<TaskCompletion[]> {
    const records = await this.prisma.taskCompletion.findMany({
      where: { taskId },
      orderBy: { completedAt: 'desc' },
    });
    return records.map((r) => this.toDomain(r));
  }

  public async findByTaskIdSince(
    taskId: bigint,
    since: Date,
  ): Promise<TaskCompletion[]> {
    const records = await this.prisma.taskCompletion.findMany({
      where: {
        taskId,
        completedAt: { gte: since },
      },
      orderBy: { completedAt: 'desc' },
    });
    return records.map((r) => this.toDomain(r));
  }

  public async create(completion: TaskCompletion): Promise<TaskCompletion> {
    const data: { taskId: bigint; completedAt?: Date } = {
      taskId: completion.taskId,
    };
    if (completion.completedAt) {
      data.completedAt = completion.completedAt;
    }
    const created = await this.prisma.taskCompletion.create({ data });
    return this.toDomain(created);
  }

  public async delete(id: bigint): Promise<void> {
    await this.prisma.taskCompletion.delete({ where: { id } });
  }

  private toDomain(record: PrismaTaskCompletion): TaskCompletion {
    return new TaskCompletion({
      id: record.id,
      taskId: record.taskId,
      completedAt: record.completedAt,
    });
  }
}
