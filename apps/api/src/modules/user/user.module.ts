import { Module } from '@nestjs/common';

import { UserPrismaRepository } from 'modules/user/infrastructure/user.prisma.repository';
import { USER_REPOSITORY } from 'modules/user';
import { PrismaModule } from 'shared';

const userRepositoryProvider = {
  provide: USER_REPOSITORY,
  useClass: UserPrismaRepository,
};

@Module({
  imports: [PrismaModule],
  providers: [userRepositoryProvider],
  exports: [USER_REPOSITORY],
})
export class UserModule {}
