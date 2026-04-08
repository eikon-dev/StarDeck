import crypto from 'crypto';

import { requireEnv } from 'shared/require-env';

import { TelegramAuthData } from './auth.types';

export class TgAuthService {
  private readonly secretKey: string;

  public constructor() {
    this.secretKey = requireEnv('TG_BOT_SECRET_KEY');
  }

  public verifyHash(authData: TelegramAuthData): boolean {
    const dataCheckString = Object.keys(authData)
      .filter((key) => key !== 'hash')
      .sort()
      .map((key) => `${key}=${authData[key]}`)
      .join('\n');

    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(this.secretKey)
      .digest();

    const computedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    return authData.hash === computedHash;
  }
}
