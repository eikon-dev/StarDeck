import { Module } from '@nestjs/common';
import { UserModule } from 'modules/user/user.module';
import { TgAuthController } from 'modules/auth/infrastructure/tg-auth.controller';
import { AuthNestAdapter } from 'modules/auth/infrastructure/auth.nest-adapter';
import { TgAuthNestAdapter } from 'modules/auth/infrastructure/tg-auth.nest-adapter';
import { AuthGuard } from 'modules/auth/infrastructure/auth.guard';

@Module({
  imports: [UserModule],
  providers: [AuthNestAdapter, TgAuthNestAdapter, AuthGuard],
  controllers: [TgAuthController],
})
export class AuthModule {}
