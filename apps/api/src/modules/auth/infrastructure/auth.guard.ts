import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthAdapter } from 'modules/auth/infrastructure/auth.adapter';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthAdapter) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const verify = this.authService.decodeToken(request.cookies.token ?? '');

    if (!verify) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
