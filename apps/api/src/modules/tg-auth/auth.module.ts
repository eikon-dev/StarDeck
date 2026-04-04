import { Module } from '@nestjs/common';
import { AuthController } from 'modules/tg-auth/infrastucture/auth.controller';
import { AuthGuard } from 'modules/tg-auth/infrastucture/auth.guard';
import { AuthService } from 'modules/tg-auth/infrastucture/auth.service';

import { UserModule } from 'modules/user/user.module';
import { TgAuthService } from 'modules/tg-auth/domain/tg-auth.service';
import { TokenService } from 'modules/tg-auth/domain/token.service';

@Module({
  imports: [UserModule],
  providers: [AuthGuard, AuthService, TgAuthService, TokenService],
  controllers: [AuthController],
})
export class AuthModule {}
