import { Nullable, PrismaService } from 'shared';
import { User } from '../domain/user.entity';
import { UserRepository } from '../domain/user.repository';

export class UserPrismaRepository implements UserRepository {
  public constructor(private readonly prisma: PrismaService) {}

  public async findByTelegramId(telegramId: string): Promise<Nullable<User>> {
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

  public async save(user: User): Promise<void> {
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
