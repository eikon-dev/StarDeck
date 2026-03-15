import { Injectable } from '@nestjs/common';
import { AuthService } from '../domain/auth.service';

@Injectable()
export class AuthAdapter extends AuthService {}
