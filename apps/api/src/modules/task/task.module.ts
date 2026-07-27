import { Module } from '@nestjs/common';

import { PrismaModule } from 'shared';
import { UserModule } from 'modules/user/user.module';

import { AuthModule } from '../tg-auth/auth.module';

import { TaskService } from './application/task.service';
import { TASK_REPOSITORY } from './domain/task.repository';
import { TaskController } from './infrastructure/task.controller';
import { TaskPrismaRepository } from './infrastructure/task.prisma.repository';

@Module({
  imports: [AuthModule, UserModule, PrismaModule],
  controllers: [TaskController],
  providers: [
    TaskService,
    {
      provide: TASK_REPOSITORY,
      useClass: TaskPrismaRepository,
    },
  ],
})
export class TaskModule {}
