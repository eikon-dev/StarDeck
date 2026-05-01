import { Module } from '@nestjs/common';
import { AuthGuard, AuthService } from 'modules/tg-auth';

import { AuthController } from 'modules/tg-auth/infrastructure/auth.controller';
import { UserModule } from 'modules/user/user.module';
import { TgAuthService } from 'modules/tg-auth/domain/tg-auth.service';
import { TokenService } from 'modules/tg-auth/domain/token.service';

@Module({
  imports: [UserModule],
  providers: [AuthGuard, AuthService, TgAuthService, TokenService],
  controllers: [AuthController],
})
export class AuthModule {}
