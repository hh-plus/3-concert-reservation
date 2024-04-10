import { CashLog, User, cashLogType } from '@prisma/client';

export abstract class CashLogRepositoryPort {
  abstract getOne(userId: number): Promise<number>;
  abstract create(
    userId: number,
    cash: number,
    type: cashLogType,
  ): Promise<void>;
}

export abstract class UserRepositoryPort {
  abstract getOne(userId: number): Promise<User>;
}
