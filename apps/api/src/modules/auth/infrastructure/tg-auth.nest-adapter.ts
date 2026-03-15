import { Injectable } from '@nestjs/common';
import { TgAuthService } from '../domain/tg-auth.service';

@Injectable()
export class TgAuthNestAdapter extends TgAuthService {}
