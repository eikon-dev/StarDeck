import { User } from 'modules';
import { Nullable } from 'shared';
import jwt from 'jsonwebtoken';

export class AuthService {
  private readonly secret: string;

  public constructor() {
    this.secret = process.env.JWT_SECRET!;
  }

  public createToken({ firstName, telegramId }: User): string {
    return jwt.sign(
      {
        firstName,
        telegramId,
      },
      this.secret,
      { expiresIn: '24h' },
    );
  }

  public decodeToken(token: string): Nullable<User> {
    try {
      return jwt.verify(token, this.secret) as User;
    } catch (err) {
      return null;
    }
  }
}
