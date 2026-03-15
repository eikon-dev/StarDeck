import { Module } from '@nestjs/common';
import { UserPrismaRepository } from 'modules/user/infrastructure/user.prisma.repository';
import { USER_REPOSITORY } from 'modules/user';

const userRepositoryProvider = {
  provide: USER_REPOSITORY,
  useClass: UserPrismaRepository,
};

@Module({
  providers: [userRepositoryProvider],
  exports: [USER_REPOSITORY],
})
export class UserModule {}
