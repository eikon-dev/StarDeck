import { Injectable } from '@nestjs/common';
import { AuthService } from '../domain/auth.service';

@Injectable()
export class AuthNestAdapter extends AuthService {}
