import { User, UserToken } from '@prisma/client';

export abstract class UserRepositoryPort {
  abstract create(userId: number): Promise<UserToken>;
  abstract getAll(): Promise<UserToken[]>;
  abstract getCountByUserTokenId(userTokenId: number): Promise<number>;
  abstract deleteById(id: number): Promise<void>;
}
