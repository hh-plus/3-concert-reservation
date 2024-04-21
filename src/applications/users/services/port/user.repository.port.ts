import { UserModel } from '../../models/user.model';

export interface userRepositoryPort {
  getOneById(userId: number): Promise<UserModel | null>;
}
