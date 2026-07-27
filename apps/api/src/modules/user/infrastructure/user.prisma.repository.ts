import { Injectable } from '@nestjs/common';
import { User as PrismaUser } from '@prisma/client';

import { Nullable, PrismaService } from 'shared';
import { User } from 'modules';

import { UserRepository } from '../domain/user.repository';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  public constructor(private readonly prisma: PrismaService) {}

  public async findByTelegramId(telegramId: bigint): Promise<Nullable<User>> {
    const record = await this.prisma.user.findUnique({
      where: { telegramId: telegramId },
    });

    if (!record) return null;

    return this.toDomain(record);
  }

  public async findByUuid(uuid: string): Promise<Nullable<User>> {
    const record = await this.prisma.user.findUnique({
      where: { uuid },
    });

    if (!record) return null;

    return this.toDomain(record);
  }

  private toDomain(record: PrismaUser): User {
    return new User(
      record.uuid,
      record.telegramId,
      record.username,
      record.firstName,
      record.id,
      record.createdAt,
      record.updatedAt,
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
