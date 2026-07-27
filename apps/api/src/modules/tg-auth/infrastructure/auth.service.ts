import crypto from 'crypto';

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { TokenService } from 'modules/tg-auth/domain/token.service';
import {
  AccessPayload,
  TelegramAuthData,
} from 'modules/tg-auth/domain/auth.types';
import { TgAuthService } from 'modules/tg-auth/domain/tg-auth.service';
import { User, USER_REPOSITORY, type UserRepository } from 'modules';
import { Nullable } from 'shared';

@Injectable()
export class AuthService {
  public constructor(
    private readonly tokenService: TokenService,
    private readonly tgAuthService: TgAuthService,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  public async login(authData: TelegramAuthData) {
    const verify = this.tgAuthService.verifyHash(authData);
    if (!verify) {
      throw new UnauthorizedException();
    }

    const user: Nullable<User> = await this.userRepository.findByTelegramId(
      authData.id,
    );

    let currentUser: User;

    if (!user) {
      const mapData: User = {
        uuid: crypto.randomUUID(),
        telegramId: authData.id,
        username: authData.username ?? null,
        firstName: authData.first_name,
        createdAt: new Date(),
      };

      await this.userRepository.save(mapData);
      currentUser = mapData;
    } else {
      currentUser = user;
    }

    const payload: AccessPayload = {
      sub: currentUser.uuid,
      telegramId: currentUser.telegramId.toString(),
    };

    return this.tokenService.signAccessToken(payload);
  }
  public logout() {}
  public refresh() {}
}
