import {TelegramAuthData} from "./tg-auth.types";
import {createHash, createHmac} from "node:crypto";

export class TgAuthService {
  private readonly secretKey: string;

  constructor() {
    this.secretKey = process.env.TELEGRAM_AUTH_SECRET_KEY!;
  }

  verifyHash(authData: TelegramAuthData): boolean {
    const checkHash = authData.hash;

    const dataCheckString = Object.keys(authData)
      .filter(key => key !== 'hash')
      .sort()
      .map(key => `${key}=${authData[key]}`)
      .join('\n');

    const secretKey = createHmac('sha256', "WebAppData")
      .update(this.secretKey)
      .digest();

    const computedHash = createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    return checkHash === computedHash
  }
}