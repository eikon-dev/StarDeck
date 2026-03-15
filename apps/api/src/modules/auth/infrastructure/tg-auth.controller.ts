import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  type TelegramAuthData,
  User,
  type UserRepository,
  USER_REPOSITORY,
} from 'modules';
import { TgAuthNestAdapter } from 'modules/auth/infrastructure/tg-auth.nest-adapter';
import { AuthNestAdapter } from 'modules/auth/infrastructure/auth.nest-adapter';

@Controller('tg-auth')
export class TgAuthController {
  public constructor(
    private readonly tgAuthService: TgAuthNestAdapter,
    private readonly authService: AuthNestAdapter,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  @Post()
  public async signUser(@Body() data: TelegramAuthData) {
    const check = this.tgAuthService.verifyHash(data);
    if (!check) return;

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

    return { token };
  }
}
