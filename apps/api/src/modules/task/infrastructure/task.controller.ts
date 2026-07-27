import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaskCategory } from '@prisma/client';

import { AuthGuard, CurrentUser } from 'modules/tg-auth';
import { User } from 'modules/user';

import { Task } from '../domain/task.entity';
import { TaskService } from '../application/task.service';

type CreateTaskDto = {
  title: string;
  description?: string;
  category: TaskCategory;
  recurrenceRule?: string;
  deadline?: string;
};

type UpdateTaskDto = {
  title?: string;
  description?: string | null;
  category?: TaskCategory;
  recurrenceRule?: string | null;
  deadline?: string | null;
};

@Controller('tasks')
@UseGuards(AuthGuard)
export class TaskController {
  public constructor(private readonly taskService: TaskService) {}

  @Post()
  public async create(@Body() dto: CreateTaskDto, @CurrentUser() user: User) {
    const task = await this.taskService.createTask({
      userId: user.id!,
      title: dto.title,
      description: dto.description ?? null,
      category: dto.category,
      recurrenceRule: dto.recurrenceRule ?? null,
      deadline: dto.deadline ? new Date(dto.deadline) : null,
    });
    return this.toResponse(task);
  }

  @Get()
  public async list(
    @CurrentUser() user: User,
    @Query('category') category?: TaskCategory,
  ) {
    const tasks = await this.taskService.getUserTasks(user.id!, category);
    return tasks.map((t) => this.toResponse(t));
  }

  @Get(':uuid')
  public async getOne(@Param('uuid') uuid: string, @CurrentUser() user: User) {
    const task = await this.taskService.getTaskByUuid(uuid, user.id!);
    return this.toResponse(task);
  }

  @Patch(':uuid')
  public async update(
    @Param('uuid') uuid: string,
    @Body() dto: UpdateTaskDto,
    @CurrentUser() user: User,
  ) {
    const task = await this.taskService.updateTask(uuid, user.id!, {
      title: dto.title,
      description: dto.description,
      category: dto.category,
      recurrenceRule: dto.recurrenceRule,
      deadline:
        dto.deadline === null
          ? null
          : dto.deadline
            ? new Date(dto.deadline)
            : undefined,
    });
    return this.toResponse(task);
  }

  @Delete(':uuid')
  @HttpCode(204)
  public async delete(@Param('uuid') uuid: string, @CurrentUser() user: User) {
    await this.taskService.deleteTask(uuid, user.id!);
  }

  private toResponse(task: Task) {
    return {
      uuid: task.uuid,
      title: task.title,
      description: task.description,
      category: task.category,
      recurrenceRule: task.recurrenceRule,
      deadline: task.deadline?.toISOString() ?? null,
      createdAt: task.createdAt?.toISOString(),
      updatedAt: task.updatedAt?.toISOString(),
    };
  }
}
