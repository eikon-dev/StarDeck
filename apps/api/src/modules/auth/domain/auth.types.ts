// import { JwtPayload } from 'jsonwebtoken';
// import { Nullable } from 'shared';
//
// /**
//  * Полезная нагрузка (payload) access-токена после декодирования JWT.
//  */
// export class AccessTokenPayload {
//   public sub: string;
//   public telegramId: number;
//   public firstName: string;
//   public exp: number;
//   public iat: number;
//
//   public constructor(data: AccessTokenPayload) {
//     this.sub = data.sub;
//     this.telegramId = data.telegramId;
//     this.firstName = data.firstName;
//     this.exp = data.exp;
//     this.iat = data.iat;
//   }
//
//   public static fromJwtPayload(
//     payload: string | JwtPayload,
//   ): Nullable<AccessTokenPayload> {
//     if (typeof payload === 'string') {
//       return null;
//     }
//
//     if (
//       typeof payload.sub !== 'string' ||
//       typeof payload.firstName !== 'string' ||
//       typeof payload.telegramId !== 'number' ||
//       typeof payload.exp !== 'number' ||
//       typeof payload.iat !== 'number'
//     ) {
//       return null;
//     }
//
//     return new AccessTokenPayload({
//       sub: payload.sub,
//       telegramId: payload.telegramId,
//       firstName: payload.firstName,
//       exp: payload.exp,
//       iat: payload.iat,
//     });
//   }
// }
