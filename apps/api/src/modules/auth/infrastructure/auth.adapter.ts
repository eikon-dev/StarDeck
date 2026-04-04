// import { Injectable } from '@nestjs/common';
// import { AccessTokenPayload, AuthService, User } from 'modules';
// import { Nullable } from 'shared';
//
// @Injectable()
// export class AuthAdapter {
//   private readonly AuthService: AuthService = new AuthService({
//     jwtSecret: process.env.JWT_SECRET ?? '',
//   });
//
//   public createToken(user: User): string {
//     return this.AuthService.createToken(user);
//   }
//
//   public decodeToken(token: string): Nullable<AccessTokenPayload> {
//     return this.AuthService.decodeToken(token);
//   }
// }
