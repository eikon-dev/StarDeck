import jwt from 'jsonwebtoken';

import { AccessPayload } from 'modules/tg-auth/domain/auth.types';
import { Nullable } from 'shared';
import { requireEnv } from 'shared/require-env';
import { ACCESS_TOKEN_TTL } from 'modules/tg-auth/domain/auth.constants';

export class TokenService {
  private readonly secret: string;

  public constructor() {
    this.secret = requireEnv('JWT_ACCESS_SECRET');
  }

  public signAccessToken(payload: AccessPayload) {
    return jwt.sign(payload, this.secret, {
      expiresIn: ACCESS_TOKEN_TTL,
    });
  }

  public verifyAccessToken(token: string): Nullable<AccessPayload> {
    if (!token) return null;

    try {
      return jwt.verify(token, this.secret) as AccessPayload;
    } catch {
      return null;
    }
  }
}
