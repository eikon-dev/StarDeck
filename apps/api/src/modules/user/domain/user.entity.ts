
export class User {
  constructor(
    readonly id: string,
    readonly telegramId: string,
    readonly username: string | null,
    readonly firstName: string,
    readonly createdAt: Date,
    //readonly updatedAt: Date,
  ) {}
}
