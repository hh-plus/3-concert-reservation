import { User, UserToken } from '@prisma/client';
import { UserTokenModel } from 'src/domains/users/models/user-token.model';

export abstract class UserTokenRepositoryPort {
  abstract getAll(): Promise<UserTokenModel[]>;
  abstract create(
    userId: number,
    entryTime: Date,
    expiredAt: Date,
  ): Promise<UserTokenModel>;
  abstract getUserTokenByUserId(userId: number): Promise<UserTokenModel | null>;
}
