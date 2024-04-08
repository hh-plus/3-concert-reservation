import { User, UserToken } from '@prisma/client';

export abstract class UserRepositoryPort {
  abstract getOne(userId: number): Promise<UserToken | null>;
  abstract create(userId: number): Promise<UserToken>;
  abstract getAll(): Promise<UserToken[]>;
}
