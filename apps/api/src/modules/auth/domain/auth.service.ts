// import { AccessTokenPayload, AuthServiceConfig, User } from 'modules';
// import { Nullable } from 'shared';
// import jwt from 'jsonwebtoken';
//
// export class AuthService {
//   private readonly secret: string;
//
//   public constructor(configuration: AuthServiceConfig) {
//     this.secret = configuration.jwtSecret;
//   }
//
//   public createToken({ uuid, firstName, telegramId }: User): string {
//     const iat = Math.floor(Date.now() / 1000);
//     const exp = iat + 24 * 60 * 60;
//
//     const payload = new AccessTokenPayload({
//       sub: uuid,
//       firstName,
//       telegramId: Number(telegramId),
//       iat,
//       exp,
//     });
//
//     return jwt.sign(payload, this.secret, {
//       expiresIn: '24h',
//     });
//   }
//
//   public decodeToken(token: string): Nullable<AccessTokenPayload> {
//     try {
//       const jwtPayload = jwt.verify(token, this.secret);
//       return AccessTokenPayload.fromJwtPayload(jwtPayload);
//     } catch (err) {
//       return null;
//     }
//   }
// }
