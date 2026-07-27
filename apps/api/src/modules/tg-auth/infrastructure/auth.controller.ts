import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';

import { type TelegramAuthData } from 'modules/tg-auth/domain/auth.types';
import { requireEnv } from 'shared/require-env';
import { ACCESS_TOKEN_TTL } from 'modules/tg-auth/domain/auth.constants';
import { AuthService, AuthGuard, CurrentUser } from 'modules/tg-auth';
import { User } from 'modules/user';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(
    @Body() data: TelegramAuthData,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.login(data);

    res.cookie('token', token, {
      httpOnly: true,
      secure: requireEnv('NODE_ENV') === 'production',
      sameSite: 'lax',
      maxAge: ACCESS_TOKEN_TTL * 1000,
    });

    return { success: true };
  }

  @UseGuards(AuthGuard)
  @Get('me')
  public me(@CurrentUser() user: User) {
    return {
      uuid: user.uuid,
      telegramId: user.telegramId.toString(),
      username: user.username,
      firstName: user.firstName,
    };
  }
  public async logout() {}
}
