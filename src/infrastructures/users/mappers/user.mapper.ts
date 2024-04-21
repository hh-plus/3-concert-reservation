import { User } from '@prisma/client';
import { UserModel } from 'src/applications/users/models/user.model';

export const convertUser = (user: User): UserModel => {
  return {
    id: user.id,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
