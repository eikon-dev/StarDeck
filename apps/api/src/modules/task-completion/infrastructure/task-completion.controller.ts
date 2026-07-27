import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard, CurrentUser } from 'modules/tg-auth';
import { User } from 'modules/user';

import { TaskCompletionService } from '../application/task-completion.service';
import { TaskCompletion } from '../domain/task-completion.entity';

type CompleteTaskDto = {
  completedAt?: string;
};

@Controller('tasks/:taskUuid/completions')
@UseGuards(AuthGuard)
export class TaskCompletionController {
  public constructor(
    private readonly completionService: TaskCompletionService,
  ) {}

  @Post()
  public async complete(
    @Param('taskUuid') taskUuid: string,
    @Body() dto: CompleteTaskDto,
    @CurrentUser() user: User,
  ) {
    const completion = await this.completionService.completeTask({
      taskUuid,
      userId: user.id!,
      completedAt: dto.completedAt ? new Date(dto.completedAt) : undefined,
    });
    return this.toResponse(completion);
  }

  @Get()
  public async list(
    @Param('taskUuid') taskUuid: string,
    @CurrentUser() user: User,
  ) {
    const completions = await this.completionService.getTaskHistory(
      taskUuid,
      user.id!,
    );
    return completions.map((c) => this.toResponse(c));
  }

  @Delete(':completionId')
  @HttpCode(204)
  public async uncomplete(
    @Param('taskUuid') taskUuid: string,
    @Param('completionId') completionId: string,
    @CurrentUser() user: User,
  ) {
    await this.completionService.uncompleteTask(
      BigInt(completionId),
      taskUuid,
      user.id!,
    );
  }

  private toResponse(completion: TaskCompletion) {
    return {
      id: completion.id?.toString(),
      completedAt: completion.completedAt?.toISOString(),
    };
  }
}
