import { TelegramAuthData } from './tg-auth.types';
import crypto from 'crypto';

export class TgAuthService {
  private readonly secretKey: string;

  public constructor() {
    this.secretKey = process.env.TELEGRAM_AUTH_SECRET_KEY!;
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
