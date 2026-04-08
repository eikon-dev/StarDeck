import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { TokenService } from 'modules/tg-auth/domain/token.service';
import { Nullable } from 'shared';
import { AccessPayload } from 'modules/tg-auth/domain/auth.types';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const token = (request.cookies as Record<string, string>).token;
    const payload: Nullable<AccessPayload> =
      this.tokenService.verifyAccessToken(token);

    if (!payload) {
      throw new UnauthorizedException();
    }

    request.user = payload;

    return true;
  }
}
