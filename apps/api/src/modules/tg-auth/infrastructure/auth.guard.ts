import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { TokenService } from 'modules/tg-auth/domain/token.service';
import { USER_REPOSITORY } from 'modules/user';
import type { UserRepository } from 'modules/user/domain/user.repository';
import type { User } from 'modules/user/domain/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly tokenService: TokenService,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request & { user?: User } = context
      .switchToHttp()
      .getRequest();
    const token = (request.cookies as Record<string, string>)?.token;

    if (!token) {
      throw new UnauthorizedException();
    }

    const payload = this.tokenService.verifyAccessToken(token);
    if (!payload) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findByUuid(payload.sub);
    if (!user || !user.id) {
      throw new UnauthorizedException();
    }

    request.user = user;
    return true;
  }
}
