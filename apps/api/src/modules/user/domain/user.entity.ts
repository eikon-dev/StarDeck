export class User {
  public constructor(
    readonly uuid: string,
    readonly telegramId: bigint,
    readonly username: string | null,
    readonly firstName: string,
    readonly id?: bigint,
    readonly createdAt?: Date,
    readonly updatedAt?: Date,
  ) {}
}
