import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthNestAdapter } from 'modules/auth/infrastructure/auth.nest-adapter';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthNestAdapter) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const verify = this.authService.decodeToken(request.cookies.token ?? '');

    if (!verify) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
