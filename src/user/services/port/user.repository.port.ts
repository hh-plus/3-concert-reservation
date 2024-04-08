import { User, UserToken } from '@prisma/client';

export abstract class UserRepositoryPort {
  abstract getUserToken(userId: number): Promise<UserToken | null>;
}
