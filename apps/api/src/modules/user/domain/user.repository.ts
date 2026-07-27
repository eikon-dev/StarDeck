import { User } from './user.entity';

export interface UserRepository {
  findByTelegramId(telegramId: bigint): Promise<User | null>;
  findByUuid(uuid: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
