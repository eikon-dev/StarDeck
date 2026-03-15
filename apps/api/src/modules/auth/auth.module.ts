import { Module } from '@nestjs/common';
import { UserModule } from 'modules/user/user.module';
import { TgAuthController } from 'modules/auth/infrastructure/tg-auth.controller';
import { AuthAdapter } from 'modules/auth/infrastructure/auth.adapter';
import { TgAuthAdapter } from 'modules/auth/infrastructure/tg-auth.adapter';
import { AuthGuard } from 'modules/auth/infrastructure/auth.guard';

@Module({
  imports: [UserModule],
  providers: [AuthAdapter, TgAuthAdapter, AuthGuard],
  controllers: [TgAuthController],
})
export class AuthModule {}
