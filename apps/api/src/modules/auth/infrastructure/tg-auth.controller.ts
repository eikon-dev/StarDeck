import {
  Body,
  Controller,
  Inject,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { Response } from 'express';
import {
  type TelegramAuthData,
  User,
  type UserRepository,
  USER_REPOSITORY,
} from 'modules';
import { TgAuthAdapter } from 'modules/auth/infrastructure/tg-auth.adapter';
import { AuthAdapter } from 'modules/auth/infrastructure/auth.adapter';

@Controller('tg-auth')
export class TgAuthController {
  public constructor(
    private readonly tgAuthService: TgAuthAdapter,
    private readonly authService: AuthAdapter,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  @Post()
  public async signUser(
    @Body() data: TelegramAuthData,
    @Res({ passthrough: true }) res: Response,
  ) {
    const check = this.tgAuthService.verifyHash(data);
    if (!check) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findByTelegramId(data.id);

    let currentUser: User;

    if (!user) {
      const mapData: User = {
        id: crypto.randomUUID(),
        telegramId: data.id,
        username: data.username ?? null,
        firstName: data.first_name,
        createdAt: new Date(),
      };

      await this.userRepository.save(mapData);
      currentUser = mapData;
    } else {
      currentUser = user;
    }

    const token = this.authService.createToken(currentUser);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  }
}
