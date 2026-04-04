import { Module } from '@nestjs/common';

import { UserPrismaRepository } from 'modules/user/infrastructure/user.prisma.repository';
import { USER_REPOSITORY } from 'modules/user';
import { PrismaService } from 'shared';

const userRepositoryProvider = {
  provide: USER_REPOSITORY,
  useClass: UserPrismaRepository,
};

@Module({
  providers: [userRepositoryProvider, PrismaService],
  exports: [USER_REPOSITORY],
})
export class UserModule {}
