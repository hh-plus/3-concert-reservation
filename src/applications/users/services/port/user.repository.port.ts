import { User, UserToken } from '@prisma/client';
import { UserTokenModel } from 'src/domains/users/models/user-token.model';

export abstract class UserRepositoryPort {
  abstract create(userId: number): Promise<UserToken>;
  abstract getUserTokenByUserId(userId: number): Promise<UserTokenModel>;
}
