import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';
import { PrismaService } from 'shared';

export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByTelegramId(telegramId: string): Promise<User | null> {
    const record = await this.prisma.user.findUnique({
      where: { telegramId },
    });

    if (!record) return null;

    return new User(
      record.id,
      record.telegramId,
      record.username,
      record.firstName,
      record.createdAt,
    );
  }

  async save(user: User): Promise<void> {
    await this.prisma.user.upsert({
      where: {
        telegramId: user.telegramId,
      },
      update: {
        username: user.username,
        firstName: user.firstName,
      },
      create: {
        id: user.id,
        telegramId: user.telegramId,
        username: user.username,
        firstName: user.firstName,
      },
    });
  }
}
