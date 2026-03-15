import { User } from './user.entity';

export interface UserRepository {
  findByTelegramId(telegramId: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
