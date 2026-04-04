//TODO: Подтянуть изменения, после изменения модели User

export class User {
  constructor(
    readonly uuid: string,
    readonly telegramId: bigint,
    readonly username: string | null,
    readonly firstName: string,
    readonly id?: bigint,
    readonly createdAt?: Date,
    readonly updatedAt?: Date,
  ) {}
}
