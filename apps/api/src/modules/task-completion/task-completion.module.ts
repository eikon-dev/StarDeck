import { Module } from '@nestjs/common';

import { PrismaModule } from 'shared';
import { AuthModule } from 'modules/tg-auth';

import { TaskModule } from '../task/task.module';

import { TaskCompletionService } from './application/task-completion.service';
import { TASK_COMPLETION_REPOSITORY } from './domain/task-completion.repository';
import { TaskCompletionController } from './infrastructure/task-completion.controller';
import { TaskCompletionPrismaRepository } from './infrastructure/task-completion.prisma.repository';

@Module({
  imports: [AuthModule, PrismaModule, TaskModule],
  controllers: [TaskCompletionController],
  providers: [
    TaskCompletionService,
    {
      provide: TASK_COMPLETION_REPOSITORY,
      useClass: TaskCompletionPrismaRepository,
    },
  ],
})
export class TaskCompletionModule {}
